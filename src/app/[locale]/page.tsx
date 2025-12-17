'use client';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Greeting from '@/components/Greeting';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-xl mb-8">{t('description')}</p>
      <Greeting />
      <div className="flex gap-4 mt-8">
        <Link href="/" locale="en" className="text-blue-500 hover:underline">English</Link>
        <Link href="/" locale="ar" className="text-blue-500 hover:underline">العربية</Link>
        <Link href="/" locale="fr" className="text-blue-500 hover:underline">Français</Link>
      </div>
    </div>
  );
}
