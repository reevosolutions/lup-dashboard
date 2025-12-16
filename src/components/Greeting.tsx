import {useTranslations} from 'next-intl';

export default function Greeting() {
  const t = useTranslations('Components.Greeting');
  return (
    <div className="p-4 border rounded bg-gray-100 dark:bg-gray-800">
      <p>{t('hello')}</p>
    </div>
  );
}
