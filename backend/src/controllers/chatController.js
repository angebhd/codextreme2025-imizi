const gbvResources = {
    "toll-free": "For immediate assistance, call the GBV toll-free number: 3512.",
    "migeprof": "MIGEPROF is responsible for promoting gender equality and family welfare in Rwanda. They provide support services for GBV victims.",
    "gbv support": "If you're facing GBV, you can seek support from MIGEPROF or call 3512 for immediate help.",
    "legal rights": "GBV victims have the right to report abuse and seek legal protection. The Rwanda Investigation Bureau (RIB) can assist you.",
    "shelters": "There are safe houses and shelters available for GBV victims. Contact MIGEPROF or local authorities for help.",
    "reporting": "To report GBV, visit the nearest police station or call the GBV helpline at 3512. You can also contact RIB at 112."
};

function getResponse(input) {
    input = input.toLowerCase().trim();

    if (/hello|hi|hey/.test(input)) return "Hello! How can I assist you with GBV-related concerns?";
    if (/bye|goodbye/.test(input)) return "Goodbye! Stay safe and reach out if you need help.";
    if (/toll[-\s]?free/.test(input)) return gbvResources["toll-free"];
    if (/migeprof|ministry of gender/.test(input)) return gbvResources["migeprof"];
    if (/gbv|violence|abuse/.test(input)) return gbvResources["gbv support"];
    if (/rights|legal|law/.test(input)) return gbvResources["legal rights"];
    if (/shelter|safe house|protection/.test(input)) return gbvResources["shelters"];
    if (/report|complain|file case/.test(input)) return gbvResources["reporting"];

    return "I'm here to help! You can ask about GBV support, toll-free numbers, legal rights, shelters, or how to report a case.";
}

exports.chat = (req, res) => {
    const userMessage = req.body.message || "";
    const botResponse = getResponse(userMessage);
    res.json({ response: botResponse });
};

