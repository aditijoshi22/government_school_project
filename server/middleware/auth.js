import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'zphs-super-secret-jwt-key-2026';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Authentication required' });
    }
    const userRole = req.user.role;
    const isAllowed = roles.some(r => {
      const target = r.toLowerCase();
      if (target === 'admin') return ['super_admin', 'section_admin', 'admin'].includes(userRole);
      if (target === 'student') return ['student_parent', 'student'].includes(userRole);
      return target === userRole;
    });

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Insufficient permissions for this action'
      });
    }
    next();
  };
}

export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
      section_id: user.section_id,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}
