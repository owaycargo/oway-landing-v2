import type { Metadata } from "next"
import Link from "next/link"
import { FileText, MessageCircle, Mail, Phone } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "Публичная оферта",
  description:
    "Публичная оферта OWAY CARGO на оказание транспортно-экспедиторских услуг по международной доставке посылок из США в страны СНГ.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Публичная оферта — OWAY CARGO",
    description:
      "Условия оказания транспортно-экспедиторских услуг OWAY CARGO.",
    url: "/terms",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const LAST_UPDATED = "23 апреля 2026 г."

const SECTIONS: { id: string; title: string }[] = [
  { id: "general", title: "1. Общие положения и термины" },
  { id: "subject", title: "2. Предмет оферты" },
  { id: "order", title: "3. Порядок заказа услуг" },
  { id: "tariffs", title: "4. Тарифы и порядок оплаты" },
  { id: "delivery-terms", title: "5. Сроки доставки" },
  { id: "prohibited", title: "6. Запрещённые к пересылке грузы" },
  { id: "customs", title: "7. Таможенное оформление и пошлины" },
  { id: "responsibilities", title: "8. Права и обязанности сторон" },
  { id: "liability", title: "9. Ответственность Оператора" },
  { id: "claims", title: "10. Порядок предъявления претензий" },
  { id: "force-majeure", title: "11. Форс-мажор" },
  { id: "disputes", title: "12. Разрешение споров" },
  { id: "changes", title: "13. Изменения оферты" },
  { id: "contacts", title: "14. Контакты Оператора" },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Публичная оферта", url: "/terms" },
        ]}
      />
      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Публичная оферта
            </h1>
            <p className="text-base md:text-lg text-slate-600">
              Условия оказания транспортно-экспедиторских услуг OWAY CARGO.
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
                1. Общие положения и термины
              </h2>
              <p>
                Настоящая Публичная оферта (далее — «Оферта») является официальным
                предложением OWAY CARGO (далее — «Оператор» или «Экспедитор»)
                заключить договор об оказании транспортно-экспедиторских услуг по
                международной доставке посылок из США в страны СНГ на указанных
                ниже условиях.
              </p>
              <p className="mt-3">
                В настоящей Оферте используются следующие термины:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><span className="font-semibold">Оператор</span> — OWAY CARGO, оказывающая транспортно-экспедиторские услуги.</li>
                <li><span className="font-semibold">Клиент</span> — физическое или юридическое лицо, использующее услуги Оператора через сайт{" "}
                  <Link href="/" className="text-blue-600 hover:text-blue-700">owaycargo.com</Link>,{" "}
                  Telegram-бот <a href="https://t.me/Oway1_bot" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">@Oway1_bot</a>{" "}
                  или личный кабинет на <a href="https://client.owaycargo.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">client.owaycargo.com</a>.</li>
                <li><span className="font-semibold">Посылка</span> — груз, передаваемый Клиентом Оператору для доставки.</li>
                <li><span className="font-semibold">Склад</span> — склад Оператора в штате Делавэр, США, а также пункты приёма в других городах США.</li>
                <li><span className="font-semibold">Пункт выдачи</span> — место в стране получения, где Клиент забирает Посылку.</li>
                <li><span className="font-semibold">Акцепт Оферты</span> — действия Клиента, свидетельствующие о согласии с условиями Оферты: регистрация на сайте, в Telegram-боте, передача Посылки на Склад или оплата услуг.</li>
              </ul>
              <p className="mt-4">
                Совершая Акцепт Оферты, Клиент подтверждает, что ознакомлен с
                настоящими условиями, полностью их принимает и обязуется соблюдать.
                Акцепт равносилен подписанию договора.
              </p>
            </section>

            <section id="subject">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                2. Предмет оферты
              </h2>
              <p>
                Оператор обязуется оказать Клиенту следующие услуги за вознаграждение:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>приём и складское хранение Посылки в США;</li>
                <li>взвешивание, фотографирование, опись содержимого;</li>
                <li>консолидация (объединение нескольких заказов в одну Посылку) — <span className="font-semibold">бесплатно</span>;</li>
                <li>repack (переупаковка без лишней фирменной упаковки для уменьшения объёмного веса) — <span className="font-semibold">бесплатно по запросу</span>;</li>
                <li>оформление таможенной декларации и сопроводительных документов;</li>
                <li>международная авиадоставка Посылки в страну получения;</li>
                <li>передача Посылки в Пункт выдачи или курьерскую службу последней мили;</li>
                <li>дополнительные услуги по отдельным тарифам: выкуп товаров из магазинов США, обмен валюты, курьерская доставка до двери.</li>
              </ul>
            </section>

            <section id="order">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                3. Порядок заказа услуг
              </h2>
              <ol className="list-decimal pl-5 space-y-2 mt-3">
                <li>Клиент регистрируется на сайте{" "}
                  <Link href="/" className="text-blue-600 hover:text-blue-700">owaycargo.com</Link> или в
                  Telegram-боте <a href="https://t.me/Oway1_bot" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">@Oway1_bot</a>.
                  После регистрации Клиент получает персональный идентификатор (OWAY-ID) и адрес Склада в США.</li>
                <li>Клиент указывает адрес Склада OWAY CARGO в качестве адреса доставки при покупке в американском магазине, добавляя свой OWAY-ID.</li>
                <li>Оператор принимает Посылку на Складе, взвешивает, фотографирует, вносит в личный кабинет Клиента.</li>
                <li>Клиент выбирает направление доставки (страна, город) и подтверждает отправку.</li>
                <li>Клиент оплачивает услуги Оператора согласно действующим Тарифам.</li>
                <li>Оператор отправляет Посылку в страну получения, Клиент отслеживает её статус в личном кабинете.</li>
                <li>Клиент получает Посылку в Пункте выдачи или от курьера, предъявив документ, удостоверяющий личность.</li>
              </ol>
            </section>

            <section id="tariffs">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                4. Тарифы и порядок оплаты
              </h2>
              <p className="mb-3">
                Действующие Тарифы на международную авиадоставку:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 pr-4">Страна получения</th>
                      <th className="text-left py-2 pr-4">Тариф</th>
                      <th className="text-left py-2">Срок</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 pr-4">🇰🇬 Кыргызстан</td>
                      <td className="py-2 pr-4">$12/кг</td>
                      <td className="py-2">7–9 дней</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 pr-4">🇰🇿 Казахстан</td>
                      <td className="py-2 pr-4">$12/кг</td>
                      <td className="py-2">7–9 дней</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 pr-4">🇺🇿 Узбекистан</td>
                      <td className="py-2 pr-4">$12/кг</td>
                      <td className="py-2">7–9 дней</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 pr-4">🇷🇺 Россия</td>
                      <td className="py-2 pr-4">$18/кг</td>
                      <td className="py-2">16–21 день</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">🇧🇾 Беларусь</td>
                      <td className="py-2 pr-4">$18/кг</td>
                      <td className="py-2">16–21 день</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                <span className="font-semibold">Объёмный вес.</span> Для крупногабаритных, но лёгких Посылок применяется
                формула: Длина × Ширина × Высота (см) ÷ 5000 = объёмный вес (кг).
                К оплате принимается БОЛЬШЕЕ значение — реальный вес или объёмный.
                Это стандарт всех международных авиаперевозок.
              </p>
              <p className="mt-3">
                <span className="font-semibold">Дополнительные услуги:</span>
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Хранение на Складе США — 30 дней бесплатно, далее $0.5/день за каждую Посылку.</li>
                <li>Оформление таможенных документов — $30.</li>
                <li>Услуга выкупа товара из магазина США — 10% от стоимости для физических лиц, 5% — для юридических лиц, оплата 100% предоплатой.</li>
                <li>Обмен валюты USD ↔ RUB / KGS / KZT / UZS / BYN — по курсу на день операции.</li>
              </ul>
              <p className="mt-4">
                <span className="font-semibold">Порядок оплаты:</span> Клиент оплачивает услуги в личном кабинете до отправки Посылки
                в страну получения. Способы оплаты указываются в личном кабинете.
                До момента оплаты Посылка остаётся на Складе Оператора.
              </p>
              <p className="mt-3">
                Оператор оставляет за собой право изменять Тарифы в одностороннем
                порядке. Новые Тарифы вступают в силу с момента их публикации на
                сайте и применяются только к Посылкам, переданным к отправке после
                этой даты.
              </p>
            </section>

            <section id="delivery-terms">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                5. Сроки доставки
              </h2>
              <p>
                Указанные в разделе 4 сроки являются ориентировочными и
                рассчитываются с момента отправки Посылки из США до прибытия в
                Пункт выдачи в стране получения. В сроки не включается:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>время нахождения Посылки на Складе США (зависит от Клиента);</li>
                <li>время таможенного оформления (может увеличить срок на 1–7 дней);</li>
                <li>задержки по независящим от Оператора причинам (погода, локдауны перевозчика, технические проблемы аэропортов).</li>
              </ul>
              <p className="mt-3">
                Оператор не несёт ответственности за нарушение сроков доставки,
                если задержка вызвана таможенными органами, стихийными бедствиями,
                действиями авиаперевозчика или другими форс-мажорными
                обстоятельствами (см. раздел 11).
              </p>
            </section>

            <section id="prohibited">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                6. Запрещённые к пересылке грузы
              </h2>
              <p>
                Оператор <span className="font-semibold">не принимает к перевозке</span>:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>оружие, боеприпасы, их части и детали;</li>
                <li>наркотические, психотропные, сильнодействующие вещества;</li>
                <li>взрывчатые, радиоактивные, легковоспламеняющиеся материалы;</li>
                <li>ядовитые, токсичные и коррозийные вещества;</li>
                <li>живых животных, растения, их семена (кроме разрешённых таможней);</li>
                <li>продукты питания скоропортящиеся (мясо, рыба, молочные);</li>
                <li>алкогольная продукция, табачные изделия;</li>
                <li>лекарственные средства, требующие рецепта врача;</li>
                <li>ювелирные изделия, валюту, ценные бумаги (по умолчанию; возможно по индивидуальному согласованию);</li>
                <li>эротические материалы, относящиеся к запрещённой категории в стране получения;</li>
                <li>любые товары, запрещённые к ввозу законодательством США, страны получения или международными конвенциями.</li>
              </ul>
              <p className="mt-4">
                При обнаружении запрещённого груза Оператор вправе отказаться от
                доставки, возвратить Посылку отправителю (за счёт Клиента) или
                передать её компетентным органам. Деньги за не оказанные услуги
                доставки в этом случае не возвращаются, если отказ вызван
                предоставлением Клиентом недостоверной информации о содержимом.
              </p>
            </section>

            <section id="customs">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                7. Таможенное оформление и пошлины
              </h2>
              <p>
                Оператор производит таможенное оформление Посылок в соответствии с
                законодательством стран ЕАЭС (Россия, Беларусь, Казахстан, Кыргызстан)
                и Республики Узбекистан.
              </p>
              <p className="mt-3">
                <span className="font-semibold">Беспошлинный лимит ЕАЭС</span> (действует до 30.06.2026): €200 и до 31 кг
                в месяц на одного получателя. При превышении лимита взимается
                таможенная пошлина 15% от суммы превышения (не менее €2 за кг
                превышения веса).
              </p>
              <p className="mt-3">
                <span className="font-semibold">С 1 июля 2026 г.</span> вводится таможенная пошлина в размере 5% от
                всей стоимости Посылки при превышении лимитов. Оператор проинформирует
                Клиента об актуальных ставках на момент отправки.
              </p>
              <p className="mt-3">
                <span className="font-semibold">Узбекистан:</span> беспошлинный лимит — $200/мес (курьерские отправления),
                $100/мес (почтовые). При превышении взимается пошлина согласно
                таможенному кодексу РУз.
              </p>
              <p className="mt-3">
                <span className="font-semibold">Электроника</span> (смартфоны, ноутбуки, планшеты, смарт-часы, блоки питания и т.п.)
                облагается пошлиной в индивидуальном порядке в зависимости от
                задекларированной стоимости. Оператор согласовывает сумму
                пошлины с Клиентом ДО отправки Посылки из США.
              </p>
              <p className="mt-3">
                Для большинства товаров таможенная пошлина уже включена в Тариф
                Оператора ($12–18/кг). Дополнительные таможенные платежи
                согласуются индивидуально.
              </p>
            </section>

            <section id="responsibilities">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                8. Права и обязанности сторон
              </h2>
              <h3 className="font-bold text-slate-900 mt-4 mb-2">Обязанности Оператора:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>оказывать услуги в соответствии с Тарифами и условиями Оферты;</li>
                <li>обеспечивать сохранность Посылок на Складе и в пути;</li>
                <li>информировать Клиента о статусе Посылки через личный кабинет, Telegram, email или SMS;</li>
                <li>соблюдать конфиденциальность данных Клиента (см.{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700">Политику конфиденциальности</Link>).</li>
              </ul>
              <h3 className="font-bold text-slate-900 mt-5 mb-2">Права Оператора:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>отказать в приёме Посылок, содержащих запрещённые к пересылке грузы;</li>
                <li>вскрывать Посылки для проверки содержимого при подозрении на нарушение раздела 6;</li>
                <li>удерживать Посылку до полной оплаты услуг;</li>
                <li>изменять Тарифы и условия Оферты в одностороннем порядке.</li>
              </ul>
              <h3 className="font-bold text-slate-900 mt-5 mb-2">Обязанности Клиента:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>предоставлять достоверные сведения о себе, получателе и содержимом Посылки;</li>
                <li>не передавать к пересылке запрещённые грузы (см. раздел 6);</li>
                <li>своевременно оплачивать услуги Оператора;</li>
                <li>своевременно забирать Посылки из Пункта выдачи (срок хранения в Пункте — 30 дней с момента прибытия).</li>
              </ul>
              <h3 className="font-bold text-slate-900 mt-5 mb-2">Права Клиента:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>получать достоверную информацию о статусе Посылки;</li>
                <li>предъявлять претензии Оператору в порядке раздела 10;</li>
                <li>отказаться от услуги до момента отправки Посылки из США (с возвратом ранее уплаченных сумм за вычетом фактических расходов Оператора).</li>
              </ul>
            </section>

            <section id="liability">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                9. Ответственность Оператора
              </h2>
              <p>
                <span className="font-semibold">Базовая компенсация.</span> При утрате или повреждении Посылки по вине
                Оператора Клиент получает компенсацию в размере фактического
                ущерба, но не более <span className="font-semibold">$500 (пятисот долларов США)</span> за одну Посылку.
                Это стандартная компенсация, включённая в базовый Тариф.
              </p>
              <p className="mt-3">
                <span className="font-semibold">Расширенная страховка.</span> По желанию Клиента может быть оформлена
                страховка Посылки на полную декларируемую стоимость. Стоимость
                страховки — 3% от задекларированной стоимости. При наступлении
                страхового случая Клиент получает компенсацию в размере 100%
                от задекларированной суммы. Страховка оформляется ДО отправки
                Посылки из США.
              </p>
              <p className="mt-3">
                <span className="font-semibold">Оператор не несёт ответственности за:</span>
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>задержки по вине таможни, авиаперевозчика, других третьих лиц;</li>
                <li>убытки вследствие указания Клиентом недостоверных данных (адрес, содержимое, стоимость);</li>
                <li>утрату или повреждение хрупких предметов, упакованных Клиентом ненадлежащим образом;</li>
                <li>убытки в результате форс-мажорных обстоятельств (см. раздел 11);</li>
                <li>косвенные убытки Клиента (упущенную выгоду, моральный вред), за исключением случаев, прямо предусмотренных законодательством.</li>
              </ul>
            </section>

            <section id="claims">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                10. Порядок предъявления претензий
              </h2>
              <p>
                Претензии по качеству услуг Оператора принимаются в следующие сроки:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><span className="font-semibold">По повреждению Посылки</span> — в течение <span className="font-semibold">48 часов</span> с момента получения Посылки Клиентом. Претензия должна сопровождаться фото повреждений (упаковка + содержимое) и актом, составленным в Пункте выдачи.</li>
                <li><span className="font-semibold">По утрате Посылки</span> — в течение <span className="font-semibold">30 дней</span> с момента планируемой даты доставки.</li>
                <li><span className="font-semibold">По срокам доставки</span> — в течение 30 дней с момента фактической доставки или окончания срока доставки.</li>
              </ul>
              <p className="mt-4">
                Претензии направляются на{" "}
                <a href="mailto:info@owaycargo.com" className="text-blue-600 hover:text-blue-700">info@owaycargo.com</a>{" "}
                или через менеджера в Telegram. Оператор рассматривает претензию
                в срок до 30 календарных дней и даёт письменный ответ.
              </p>
              <p className="mt-3">
                Претензии, поданные с нарушением сроков, к рассмотрению не
                принимаются, за исключением случаев, прямо предусмотренных
                законодательством.
              </p>
            </section>

            <section id="force-majeure">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                11. Форс-мажор
              </h2>
              <p>
                Стороны освобождаются от ответственности за неисполнение или
                ненадлежащее исполнение обязательств по настоящей Оферте, если
                это вызвано форс-мажорными обстоятельствами:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>стихийные бедствия (землетрясения, наводнения, ураганы);</li>
                <li>военные действия, террористические акты;</li>
                <li>эпидемии, пандемии, карантинные ограничения;</li>
                <li>акты государственных органов, изменения законодательства, санкции;</li>
                <li>забастовки авиаперевозчиков, закрытие аэропортов;</li>
                <li>сбои работы таможенных органов;</li>
                <li>киберпреступность, DDoS-атаки, сбои интернет-провайдеров.</li>
              </ul>
              <p className="mt-4">
                Срок исполнения обязательств продлевается на время действия
                форс-мажорных обстоятельств.
              </p>
            </section>

            <section id="disputes">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                12. Разрешение споров
              </h2>
              <p>
                Споры между Оператором и Клиентом разрешаются путём переговоров.
                Претензионный порядок является обязательным. Если спор не удаётся
                урегулировать в течение 60 дней с момента поступления претензии,
                он передаётся на рассмотрение суда:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>для Клиентов из РФ — по месту жительства Клиента в порядке, установленном ГПК РФ;</li>
                <li>для Клиентов из других стран СНГ — в соответствии с законодательством страны Клиента;</li>
                <li>международные аспекты (перевозка между США и СНГ) регулируются соответствующими международными конвенциями и двусторонними соглашениями.</li>
              </ul>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                13. Изменения оферты
              </h2>
              <p>
                Оператор оставляет за собой право вносить изменения в настоящую
                Оферту в одностороннем порядке. Актуальная версия всегда доступна
                по адресу{" "}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                  owaycargo.com/terms
                </Link>
                . Существенные изменения сообщаются пользователям через Telegram-бот,
                email или уведомление в личном кабинете не менее чем за 7 дней до
                вступления в силу.
              </p>
              <p className="mt-4">
                Продолжение использования сервисов OWAY CARGO после вступления
                изменений в силу означает согласие Клиента с новыми условиями.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Дата последнего обновления: {LAST_UPDATED}
              </p>
            </section>

            <section id="contacts">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                14. Контакты Оператора
              </h2>
              <p>Для связи с Оператором используйте любой удобный канал:</p>
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
              <p className="mt-6 text-sm text-slate-500">
                Юридический адрес склада: Delaware, USA.
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}
