export const Obfuscator = {
    prefix: "RAM_ak_", 

    mask: (uid) => {
        if (!uid) return "";
        
        const q = Math.floor(uid.length / 4);
        const p1 = uid.slice(0, q);
        const p2 = uid.slice(q, q * 2);
        const p3 = uid.slice(q * 2, q * 3);
        const p4 = uid.slice(q * 3);
        const scrambled = `${p3}${p1}${p4}${p2}`;

        // Change 'this.prefix' to 'Obfuscator.prefix'
        return Obfuscator.prefix + btoa(scrambled)
            .replace(/\+/g, '-') 
            .replace(/\//g, '_') 
            .replace(/=/g, '');  
    },

    unmask: (masked) => {
        // Change 'this.prefix' to 'Obfuscator.prefix'
        if (!masked || !masked.startsWith(Obfuscator.prefix)) return "";

        try {
            let token = masked.replace(Obfuscator.prefix, "")
                .replace(/-/g, '+')
                .replace(/_/g, '/');

            while (token.length % 4 !== 0) token += "=";

            const scrambled = atob(token);

            const q = Math.floor(scrambled.length / 4);
            const p3 = scrambled.slice(0, q);
            const p1 = scrambled.slice(q, q * 2);
            const p4 = scrambled.slice(q * 2, q * 3);
            const p2 = scrambled.slice(q * 3);

            return `${p1}${p2}${p3}${p4}`;
        } catch (e) {
            //console.error("Unmask error:", e);
            return "";
        }
    },
    maskEmailForKey: (email) => {
        if (!email) return "";
        
        // 1. We use the base mask logic (scramble + safe Base64)
        // This automatically handles the "." and "@" by encoding them
        const masked = Obfuscator.mask(email); 

        // 2. We replace the standard prefix with the email-specific one
        return masked.replace("RAM_ak_", Obfuscator.prefix);
    },

    unmaskEmailFromKey: (maskedEmail) => {
        if (!maskedEmail || !maskedEmail.startsWith(Obfuscator.prefix)) return "";

        // 1. Swap the prefix back to the one the unmasker expects
        const standardMask = maskedEmail.replace(Obfuscator.prefix, "RAM_ak_");

        // 2. Use the original unmask logic to restore the email
        return Obfuscator.unmask(standardMask);
    }
};