import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Providers from "../providers.jsx";
import SetHtmlLang from "@/components/SetHtmlLang.jsx";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
    const { locale } = await params;

    // Validar que el locale sea válido
    if (!routing.locales.includes(locale)) {
        notFound();
    }

    // Habilitar renderizado estático
    setRequestLocale(locale);

    // Cargar los mensajes de traducción
    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <SetHtmlLang locale={locale} />
            <Providers>{children}</Providers>
        </NextIntlClientProvider>
    );
}
