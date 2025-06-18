const db = require('../config/db');

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    await db.query(sql, [name, address, latitude, longitude]);

    res.status(201).json({ message: 'School added successfully' });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'DB Error', details: err.message });
  }
};


exports.listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  try {
    const [results] = await db.query('SELECT * FROM schools');

    const schoolsWithDistance = results.map((school) => {
      const dist = getDistance(userLat, userLon, school.latitude, school.longitude);
      return { ...school, distance: dist };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    res.json(schoolsWithDistance);
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'DB Error', details: err.message });
  }
};

// Haversine formula to calculate distance
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}
function toRad(value) {
  return (value * Math.PI) / 180;
}