const prisma = require('../config/db');

// @desc    Get all settings
// @route   GET /api/settings
// @access  Private
const getSettings = async (req, res) => {
    try {
        const settingsList = await prisma.setting.findMany();
        const settingsMap = {};
        settingsList.forEach(s => {
            settingsMap[s.key] = s.value;
        });
        res.status(200).json({ success: true, data: settingsMap });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private (Admin)
const updateSettings = async (req, res) => {
    try {
        const settings = req.body.settings || req.body;
        
        if (!settings || typeof settings !== 'object') {
            return res.status(400).json({ message: 'Invalid settings format' });
        }

        const keys = Object.keys(settings);
        
        for (const key of keys) {
            await prisma.setting.upsert({
                where: { key },
                update: { value: String(settings[key]) },
                create: { key, value: String(settings[key]) }
            });
        }

        res.status(200).json({ success: true, message: 'Settings updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSettings, updateSettings };
