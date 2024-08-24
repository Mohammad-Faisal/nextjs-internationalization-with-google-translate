'use client';
import { useEffect, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';

// The following cookie name is important because it's Google-predefined for the translation engine purpose
const COOKIE_NAME = 'googtrans';

// We should know a predefined nickname of a language and provide its title (the name for displaying)
interface LanguageDescriptor {
    name: string;
    title: string;
}

// Types for JS-based declarations in public/assets/scripts/lang-config.js
declare global {
    namespace globalThis {
        var __GOOGLE_TRANSLATION_CONFIG__: {
            languages: LanguageDescriptor[];
            defaultLanguage: string;
        };
    }
}

const LanguageSwitcher = () => {
    const [currentLanguage, setCurrentLanguage] = useState<string>();
    const [languageConfig, setLanguageConfig] = useState<any>();

    // Initialize translation engine
    useEffect(() => {
        // 1. Read the cookie
        const cookies = parseCookies();
        const existingLanguageCookieValue = cookies[COOKIE_NAME];

        let languageValue;
        if (existingLanguageCookieValue) {
            // 2. If the cookie is defined, extract a language nickname from there.
            const sp = existingLanguageCookieValue.split('/');
            if (sp.length > 2) {
                languageValue = sp[2];
            }
        }
        // 3. If __GOOGLE_TRANSLATION_CONFIG__ is defined and we still not decided about languageValue - use default one
        if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
            languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
        }
        if (languageValue) {
            // 4. Set the current language if we have a related decision.
            setCurrentLanguage(languageValue);
        }
        // 5. Set the language config.
        if (global.__GOOGLE_TRANSLATION_CONFIG__) {
            setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
        }
    }, []);

    // Don't display anything if current language information is unavailable.
    if (!currentLanguage || !languageConfig) {
        return null;
    }

    // The following function switches the current language
    const switchLanguage = (lang: string) => () => {
        // We just need to set the related cookie and reload the page
        // "/auto/" prefix is Google's definition as far as a cookie name
        setCookie(null, COOKIE_NAME, '/auto/' + lang);
        window.location.reload();
    };

    return (
        <div className="text-center grid gap-4 p-4 notranslate">
            {languageConfig.languages.map((ld: LanguageDescriptor, i: number) => (
                <>
                    {currentLanguage === ld.name ||
                    (currentLanguage === 'auto' && languageConfig.defaultLanguage === ld) ? (
                        <span key={`l_s_${ld}`} className="mx-3 text-orange-300">
                            {ld.title}
                        </span>
                    ) : (
                        <a
                            key={`l_s_${ld}`}
                            onClick={switchLanguage(ld.name)}
                            className="mx-3 text-blue-300 cursor-pointer hover:underline"
                        >
                            {ld.title}
                        </a>
                    )}
                </>
            ))}
        </div>
    );
};

export { LanguageSwitcher, COOKIE_NAME };
