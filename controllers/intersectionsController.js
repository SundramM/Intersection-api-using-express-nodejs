const turf = require('@turf/turf');

// Sample data of 50 lines (start and end points)
const linesData = require('../data/lines.json');

// Controller function to find intersections
exports.findIntersections = (req, res) => {
  const { linestring } = req.body;

  // Validate the linestring
  if (!linestring) {
    return res.status(400).json({ message: 'Linestring is missing in the request body' });
  }

  // Parse the linestring and check if it's valid GeoJSON
  let parsedLinestring;
  try {
    parsedLinestring = JSON.parse(linestring);
    if (!turf.getType(parsedLinestring) === 'LineString') {
      throw new Error();
    }
  } catch (err) {
    return res.status(400).json({ message: 'Invalid GeoJSON linestring' });
  }

  // Find intersections
  const intersections = [];
  linesData.forEach((line) => {
    const start = turf.point(line.start);
    const end = turf.point(line.end);
    const lineSegment = turf.lineString([start.geometry.coordinates, end.geometry.coordinates]);

    if (turf.booleanIntersects(parsedLinestring, lineSegment)) {
      const intersection = turf.lineIntersect(parsedLinestring, lineSegment);
      intersections.push({
        lineId: line.id,
        intersectionPoint: intersection.features[0].geometry.coordinates,
      });
    }
  });

  // Return the intersections or an empty array if there are none
  return res.json(intersections);
};
