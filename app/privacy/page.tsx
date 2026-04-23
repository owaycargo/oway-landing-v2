import type { Metadata } from "next"
import Link from "next/link"
import { Shield, MessageCircle, Mail, Phone } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика обработки персональных данных OWAY CARGO. Законодательство стран СНГ и США, цели обработки, трансграничная передача, ваши права.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Политика конфиденциальности — OWAY CARGO",
    description:
      "Как OWAY CARGO обрабатывает и защищает ваши персональные данные.",
    url: "/privacy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const LAST_UPDATED = "23 апреля 2026 г."

const SECTIONS: { id: string; title: string }[] = [
  { id: "general", title: "1. Общие положения" },
  { id: "purposes", title: "2. Цели обработки данных" },
  { id: "laws", title: "3. Применимое законодательство" },
  { id: "data", title: "4. Какие данные мы собираем" },
  { id: "cross-border", title: "5. Трансграничная передача данных" },
  { id: "principles", title: "6. Принципы обработки" },
  { id: "measures", title: "7. Меры защиты" },
  { id: "rights", title: "8. Ваши права" },
  { id: "authorities", title: "9. Надзорные органы по странам" },
  { id: "cookies", title: "10. Cookies и аналитика" },
  { id: "consent", title: "11. Согласие на обработку" },
  { id: "contacts", title: "12. Контакты для запросов о данных" },
  { id: "changes", title: "13. Изменения Политики" },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Политика конфиденциальности", url: "/privacy" },
        ]}
      />
      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Политика обработки персональных данных
            </h1>
            <p className="text-base md:text-lg text-slate-600">
              Как OWAY CARGO собирает, обрабатывает и защищает ваши данные.
            </p>
            <p className="text-sm text-slate-500 mt-3">
              Дата последнего обновления: {LAST_UPDATED}
            </p>
          </div>

          <aside className="bg-white rounded-2xl border border-slate-200 p-6 mb-10">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Содержание
            </h2>
            <ol className="space-y-2 text-sm">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 space-y-10 text-slate-700 leading-relaxed">
            <section id="general">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                1. Общие положения
              </h2>
              <p>
                Настоящая Политика обработки персональных данных (далее — «Политика»)
                разработана OWAY CARGO (далее — «Оператор») в целях выполнения норм
                законодательства Российской Федерации, стран Евразийского экономического союза
                и международных норм о защите персональных данных. Документ является
                общедоступным.
              </p>
              <p className="mt-3">
                Передавая товары для доставки в OWAY CARGO, а также при регистрации на сайте{" "}
                <Link href="/" className="text-blue-600 hover:text-blue-700">
                  owaycargo.com
                </Link>{" "}
                или в Telegram-боте{" "}
                <a
                  href="https://t.me/Oway1_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  @Oway1_bot
                </a>
                , клиенты подтверждают согласие на сбор, хранение, передачу, уничтожение и
                обработку персональных данных и конфиденциальной информации.
              </p>
            </section>

            <section id="purposes">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                2. Цели обработки данных
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>ведение кадровой работы и бухгалтерского учёта, выполнение условий трудового договора;</li>
                <li>оказание транспортно-экспедиторских услуг по доставке посылок из США в страны СНГ;</li>
                <li>таможенное оформление грузов;</li>
                <li>передача данных партнёрам в пунктах выдачи для идентификации получателя;</li>
                <li>информирование клиентов о статусе доставки через Telegram, email, SMS или звонок;</li>
                <li>обработка обращений, поддержка клиентов, улучшение качества сервиса.</li>
              </ul>
            </section>

            <section id="laws">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                3. Применимое законодательство
              </h2>
              <p>
                OWAY CARGO работает в США (склад в штате Делавэр) и доставляет посылки в
                5 стран СНГ. При обработке персональных данных применяется следующее
                законодательство:
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">🇷🇺 Российская Федерация</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Конституция Российской Федерации</li>
                    <li>Гражданский кодекс Российской Федерации</li>
                    <li>Трудовой кодекс Российской Федерации</li>
                    <li>Федеральный закон от 30.06.2003 № 87-ФЗ «О транспортно-экспедиционной деятельности»</li>
                    <li>Федеральный закон от 27.07.2006 № 152-ФЗ «О персональных данных»</li>
                    <li>Федеральный закон от 27.07.2006 № 149-ФЗ «Об информации, информационных технологиях и о защите информации»</li>
                    <li>Приказ Федеральной таможенной службы от 05.07.2018 № 1060</li>
                    <li>ТК ЕАЭС Статья 261 часть 1</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">🇰🇿 Республика Казахстан</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Закон Республики Казахстан от 21.05.2013 № 94-V «О персональных данных и их защите»</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">🇰🇬 Кыргызская Республика</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Закон Кыргызской Республики от 14.04.2008 № 58 «Об информации персонального характера»</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">🇧🇾 Республика Беларусь</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Закон Республики Беларусь от 07.05.2021 № 99-З «О защите персональных данных»</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">🇺🇿 Республика Узбекистан</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Закон Республики Узбекистан от 02.07.2019 № ЗРУ-547 «О персональных данных»</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">🇺🇸 Соединённые Штаты Америки</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>California Consumer Privacy Act (CCPA) — для резидентов Калифорнии</li>
                    <li>Общие положения федерального законодательства США о защите данных</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">🇪🇺 Европейский Союз</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Регламент ЕС 2016/679 от 27.04.2016 (GDPR) — для пользователей из ЕС</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="data">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                4. Какие данные мы собираем
              </h2>
              <p>При регистрации и использовании сервиса OWAY CARGO обрабатываются:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><span className="font-semibold">Идентификационные данные</span>: имя, фамилия, отчество (при наличии).</li>
                <li><span className="font-semibold">Контактные данные</span>: номер телефона, email.</li>
                <li><span className="font-semibold">Адресные данные</span>: страна, город, адрес доставки.</li>
                <li><span className="font-semibold">Данные о посылке</span>: описание содержимого (декларация), вес, декларируемая стоимость.</li>
                <li><span className="font-semibold">Технические данные</span>: IP-адрес, тип браузера, данные об использовании сайта (через Google Analytics), cookies.</li>
              </ul>
              <p className="mt-4">
                OWAY CARGO <span className="font-semibold">не обрабатывает</span>:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>биометрические данные (физиологические и биологические особенности);</li>
                <li>специальные категории персональных данных: расовая и национальная принадлежность, политические взгляды, религиозные или философские убеждения, состояние здоровья, интимная жизнь.</li>
              </ul>
            </section>

            <section id="cross-border">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                5. Трансграничная передача данных
              </h2>
              <p>
                В силу характера деятельности (доставка посылок из США в страны СНГ) OWAY CARGO
                <span className="font-semibold"> осуществляет трансграничную передачу персональных данных</span>:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>из США в страны СНГ — для доставки посылки получателю;</li>
                <li>между странами СНГ и США — для работы с партнёрами по доставке последней мили и пунктами выдачи.</li>
              </ul>
              <p className="mt-4">
                Передача осуществляется в соответствии со ст. 12 ФЗ-152 «О персональных данных» и
                аналогичными нормами законодательства стран-получателей. Передаваемые данные
                защищены договорами с партнёрами и техническими мерами: шифрование канала связи
                (HTTPS/TLS), ограничение доступа сотрудников по принципу наименьших привилегий,
                регулярный аудит безопасности.
              </p>
            </section>

            <section id="principles">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                6. Принципы обработки
              </h2>
              <p>
                OWAY CARGO обеспечивает соблюдение принципов и правил обработки персональных
                данных, указанных в ст. 5 ФЗ-152 «О персональных данных» и аналогичных
                актах других стран:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>законность и справедливость обработки;</li>
                <li>ограничение обработки достижением конкретных, заранее определённых целей;</li>
                <li>актуальность и достоверность данных;</li>
                <li>минимизация — собираем только то, что необходимо для оказания услуг;</li>
                <li>защита от неправомерного доступа, уничтожения, изменения или распространения.</li>
              </ul>
            </section>

            <section id="measures">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                7. Меры защиты
              </h2>
              <p>
                OWAY CARGO принимает все необходимые правовые, организационные и технические
                меры для защиты персональных данных:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>шифрование данных при передаче (HTTPS/TLS) и хранении;</li>
                <li>ограничение доступа сотрудников по принципу наименьших привилегий;</li>
                <li>ведение журналов доступа и действий;</li>
                <li>регулярный аудит инфраструктуры и устранение уязвимостей;</li>
                <li>Content Security Policy, HSTS, Rate Limiting на публичных формах для защиты от атак.</li>
              </ul>
            </section>

            <section id="rights">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                8. Ваши права
              </h2>
              <p>Вы имеете право:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>получить подтверждение факта обработки своих данных и информацию об их обработке;</li>
                <li>запросить доступ к своим персональным данным;</li>
                <li>потребовать исправления неточных или устаревших данных;</li>
                <li>потребовать удаления своих данных (если это не противоречит обязательствам по договору доставки и срокам хранения документов);</li>
                <li>отозвать согласие на обработку персональных данных;</li>
                <li>обратиться в надзорный орган своей страны с жалобой на действия Оператора.</li>
              </ul>
              <p className="mt-4">
                Для реализации указанных прав направьте запрос на{" "}
                <a
                  href="mailto:info@owaycargo.com"
                  className="text-blue-600 hover:text-blue-700"
                >
                  info@owaycargo.com
                </a>
                . Запрос рассматривается в срок, установленный применимым законодательством
                (как правило, не более 30 календарных дней).
              </p>
            </section>

            <section id="authorities">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                9. Надзорные органы по странам
              </h2>
              <p>
                Уполномоченные органы, осуществляющие контроль за обработкой персональных
                данных в странах деятельности OWAY CARGO:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>🇷🇺 <span className="font-semibold">Россия</span> — Роскомнадзор (<a href="https://rkn.gov.ru" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">rkn.gov.ru</a>)</li>
                <li>🇰🇿 <span className="font-semibold">Казахстан</span> — Министерство цифрового развития Республики Казахстан</li>
                <li>🇰🇬 <span className="font-semibold">Кыргызстан</span> — Государственное агентство по защите персональных данных Кыргызской Республики</li>
                <li>🇧🇾 <span className="font-semibold">Беларусь</span> — Национальный центр защиты персональных данных Республики Беларусь</li>
                <li>🇺🇿 <span className="font-semibold">Узбекистан</span> — Государственный персонализационный центр</li>
              </ul>
            </section>

            <section id="cookies">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                10. Cookies и аналитика
              </h2>
              <p>На сайте owaycargo.com используются следующие технологии:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><span className="font-semibold">Технические cookies</span> — необходимы для работы сайта (сессия, предпочтения, состояние формы).</li>
                <li><span className="font-semibold">Аналитические cookies</span> — Google Analytics 4 для понимания, как посетители используют сайт и для улучшения сервиса.</li>
                <li><span className="font-semibold">Локальное хранилище браузера</span> — для сохранения состояния калькулятора и формы обратной связи.</li>
              </ul>
              <p className="mt-4">
                Вы можете отключить cookies в настройках вашего браузера. Это может привести
                к ограничению функциональности сайта (например, калькулятор не запомнит ваши данные).
              </p>
            </section>

            <section id="consent">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                11. Согласие на обработку
              </h2>
              <p>
                При первом использовании сервиса OWAY CARGO (регистрация на сайте, в
                Telegram-боте, отправка заявки обратного звонка или передача товара для доставки)
                вы соглашаетесь с настоящей Политикой и подтверждаете:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>согласие на обработку персональных данных в соответствии с настоящей Политикой;</li>
                <li>согласие на получение информационных сообщений о статусе ваших посылок (SMS, Telegram, email);</li>
                <li>согласие на получение рекламно-информационной рассылки (вы можете отказаться в любой момент, ответив STOP или через настройки).</li>
              </ul>
            </section>

            <section id="contacts">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                12. Контакты для запросов о персональных данных
              </h2>
              <p>
                Запросы по вопросам обработки персональных данных, отзыва согласия или
                реализации ваших прав направляйте через любой удобный канал:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mt-5">
                <a
                  href="mailto:info@owaycargo.com"
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900">Email</div>
                    <div className="text-slate-600">info@owaycargo.com</div>
                  </div>
                </a>
                <a
                  href="https://t.me/owaycargo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900">Telegram</div>
                    <div className="text-slate-600">@owaycargo</div>
                  </div>
                </a>
                <a
                  href="tel:+12132766898"
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900">Телефон</div>
                    <div className="text-slate-600">+1 (213) 276-6898</div>
                  </div>
                </a>
              </div>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                13. Изменения Политики
              </h2>
              <p>
                OWAY CARGO оставляет за собой право вносить изменения в настоящую Политику.
                Актуальная версия всегда доступна по адресу{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                  owaycargo.com/privacy
                </Link>
                . Существенные изменения сообщаются пользователям через Telegram-бот или email.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Дата последнего обновления: {LAST_UPDATED}
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}
