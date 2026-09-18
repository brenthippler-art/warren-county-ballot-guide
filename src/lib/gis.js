export const GEOCODER =
  'https://webgis.bgky.org/server/rest/services/CompositeLocator911_Sept292023/GeocodeServer';
export const MAG_LAYER =
  'https://webgis.bgky.org/server/rest/services/CCPC/CCPC_Magisterial_Voting_Districts/FeatureServer/0';
export const CITY_LAYER =
  'https://webgis.bgky.org/server/rest/services/BGKY/BGKY_Bowling_Green_City_Limits/FeatureServer/0';
export const SENATE_LAYER =
  'https://services3.arcgis.com/ghsX9CKghMvyYjBU/arcgis/rest/services/Ky_Senate_Districts_WM_gdb/FeatureServer/0';
export const HOUSE_LAYER =
  'https://services3.arcgis.com/ghsX9CKghMvyYjBU/arcgis/rest/services/Ky_House_Districts_WM/FeatureServer/0';
// Covers Warren County's small incorporated cities (Plum Springs, Oakland,
// Smiths Grove, Woodburn) — Bowling Green has its own dedicated layer above.
export const SMALL_CITIES_LAYER =
  'https://webgis.bgky.org/server/rest/services/CCPC/CCPC_Corporate_Limits_Small_Cities/FeatureServer/0';
export const BGISD_LAYER = 
  'https://webgis.bgky.org/server/rest/services/CCPC/CCPC_School_Board_Voting_Districts_County/FeatureServer/0';

export async function geocode(address) {
  const url =
    `${GEOCODER}/findAddressCandidates?SingleLine=${encodeURIComponent(address)}` +
    `&outFields=*&maxLocations=1&outSR=4326&f=json`;
  const res = await fetch(url);
  const json = await res.json();
  if (!json.candidates || !json.candidates.length) {
    throw new Error("Couldn't find that address in Warren County. Try including the city and zip.");
  }
  const c = json.candidates[0];
  if (c.score < 80) {
    throw new Error(
      "Couldn't confidently match that address — try adding more detail (street number, city, zip)."
    );
  }
  return { x: c.location.x, y: c.location.y, matched: c.address };
}

export function normalizeDistrict(raw) {
  if (raw === null || raw === undefined || raw === '') return null;
  const n = parseInt(raw, 10);
  return Number.isNaN(n) ? String(raw).trim() : String(n);
}

export async function queryPolygon(layerUrl, x, y, outFields) {
  const url =
    `${layerUrl}/query?f=json&geometry=${x},${y}&geometryType=esriGeometryPoint` +
    `&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=${outFields}&returnGeometry=false`;
  const res = await fetch(url);
  const json = await res.json();
  return json.features && json.features[0] ? json.features[0].attributes : null;
}

/**
 * Resolves an address to every district/geography this ballot guide needs
 * in one call.
 */
export async function lookupBallot(address) {
  const loc = await geocode(address);

  const [magAttrs, cityAttrs, senateAttrs, houseAttrs, smallCityAttrs, schoolAttrs] = await Promise.all([
    queryPolygon(MAG_LAYER, loc.x, loc.y, 'Mag_Dist'),
    queryPolygon(CITY_LAYER, loc.x, loc.y, '*'),
    queryPolygon(SENATE_LAYER, loc.x, loc.y, 'District'),
    queryPolygon(HOUSE_LAYER, loc.x, loc.y, 'District'),
    queryPolygon(SMALL_CITIES_LAYER, loc.x, loc.y, 'CITY_NAME'),
    queryPolygon(BGISD_LAYER, loc.x, loc.y, 'SCH_BD_DIS')
  ]);

  return {
    matched: loc.matched,
    magDist: magAttrs ? normalizeDistrict(magAttrs.Mag_Dist) : null,
    inCity: !!cityAttrs,
    senateDist: senateAttrs ? normalizeDistrict(senateAttrs.District) : null,
    houseDist: houseAttrs ? normalizeDistrict(houseAttrs.District) : null,
    smallCity: smallCityAttrs ? String(smallCityAttrs.CITY_NAME).trim() : null,
    schoolDist: schoolAttrs ? normalizeDistrict(schoolAttrs.SCH_BD_DIS) : null,
  };
}
