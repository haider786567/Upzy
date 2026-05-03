export const securityHeaders = (req, res, next) => {
    // 1. Clickjacking Protection
    // Prevents your site from being framed inside another site (iframe), stopping attackers from tricking users into clicking things.
    res.setHeader('X-Frame-Options', 'DENY');
    
    // 2. Cross-Site Scripting (XSS) Protection
    // Prevents attackers from injecting malicious scripts into your web pages. 
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; frame-ancestors 'none'; object-src 'none';");

    // 3. Cross-Origin Embedding Protection
    // Prevents other malicious websites from embedding your backend resources or leaking data cross-origin.
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');

    // 4. Rogue Feature Access Protection
    // Denies the browser from accessing user hardware (camera, tracking, mic) even if a script tries to silently ask for it.
    res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=(), payment=(), usb=(), magnetism=()');

    // 5. SSL Stripping Protection
    // Forces the browser to strictly use HTTPS. Prevents man-in-the-middle from downgrading users to an insecure HTTP connection.
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

    // Hides the Express server fingerprint
    res.removeHeader('X-Powered-By');

    next();
};
