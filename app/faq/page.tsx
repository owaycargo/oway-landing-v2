import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSeoPage, parseKeywords, getStrapiImageUrl } from "@/lib/seo"

const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com")

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoPage("faq")
  if (!seo) {
    return {
      metadataBase,
      alternates: { canonical: "/faq" },
      robots: { index: true, follow: true },
    }
  }

  const keywords = parseKeywords(seo.keywords)
  const ogImage = seo.image?.[0]
  const imageUrl = ogImage ? getStrapiImageUrl(ogImage.url) : undefined
  const imageAlt = ogImage?.alternativeText || seo.title

  return {
    title: seo.title,
    description: seo.description,
    ...(keywords.length > 0 && { keywords }),
    authors: [{ name: "OWAY CARGO" }],
    creator: "OWAY CARGO",
    publisher: "OWAY CARGO",
    metadataBase,
    alternates: { canonical: "/faq" },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: "/faq",
      siteName: "OWAY CARGO",
      locale: "ru_RU",
      type: "website",
      ...(imageUrl && {
        images: [
          { url: imageUrl, width: ogImage?.width ?? 1200, height: ogImage?.height ?? 630, alt: imageAlt },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      ...(imageUrl && { images: [imageUrl] }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default function FAQPage() {
  const faqCategories = [
    {
      category: "Общие вопросы",
      questions: [
        {
          q: "Как работает доставка из США в СНГ?",
          a: "Вы совершаете покупку в американском интернет-магазине и указываете наш склад в США в качестве адреса доставки. После получения товара мы отправляем его в выбранную вами страну СНГ. Весь процесс занимает 7-14 дней.",
        },
        {
          q: "Какие страны вы обслуживаете?",
          a: "Мы доставляем в Россию, Беларусь и Киргизию. География постоянно расширяется — следите за обновлениями на нашем сайте.",
        },
        {
          q: "Нужно ли мне регистрироваться?",
          a: "Да, для использования наших услуг необходимо создать личный кабинет. Регистрация занимает меньше минуты и даёт вам доступ к отслеживанию посылок и истории заказов.",
        },
        {
          q: "Сколько стоит доставка?",
          a: "Стоимость зависит от веса, габаритов и скорости доставки. Используйте наш калькулятор на главной странице для точного расчёта. Базовая цена начинается от $8 за кг.",
        },
      ],
    },
    {
      category: "Оформление заказа",
      questions: [
        {
          q: "Какой адрес указывать при покупке в американском магазине?",
          a: "После регистрации вы получите персональный адрес нашего склада в США с вашим уникальным ID. Этот адрес нужно указать при оформлении заказа в качестве адреса доставки.",
        },
        {
          q: "Можно ли объединить несколько посылок в одну?",
          a: "Да, вы можете запросить консолидацию посылок в личном кабинете. Это позволит сэкономить на доставке. Услуга консолидации бесплатна.",
        },
        {
          q: "Что делать, если я купил товар до регистрации?",
          a: "Свяжитесь с нашей службой поддержки, мы поможем оформить посылку задним числом и присвоить ей ваш ID.",
        },
        {
          q: "Есть ли ограничения по типу товаров?",
          a: "Мы не доставляем запрещённые товары: оружие, наркотики, легковоспламеняющиеся жидкости, скоропортящиеся продукты. Полный список ограничений доступен в личном кабинете.",
        },
      ],
    },
    {
      category: "Доставка и отслеживание",
      questions: [
        {
          q: "Как отследить мою посылку?",
          a: "В личном кабинете вы увидите статус всех ваших посылок в реальном времени. Также вы будете получать уведомления на email и в Telegram о каждом этапе доставки.",
        },
        {
          q: "Сколько занимает доставка?",
          a: "Стандартная доставка — 10-14 дней, экспресс-доставка — 5-7 дней с момента поступления товара на наш склад в США.",
        },
        {
          q: "Что делать, если посылка задерживается?",
          a: "Свяжитесь с нашей поддержкой через личный кабинет или по телефону. Мы проверим статус и предоставим актуальную информацию.",
        },
        {
          q: "Возможна ли доставка до двери?",
          a: "Да, мы предлагаем доставку курьером до двери в большинстве крупных городов. Также доступен самовывоз из наших пунктов выдачи.",
        },
      ],
    },
    {
      category: "Оплата и таможня",
      questions: [
        {
          q: "Какие способы оплаты вы принимаете?",
          a: "Мы принимаем банковские карты (Visa, Mastercard, МИР), электронные кошельки, банковские переводы и криптовалюту.",
        },
        {
          q: "Когда нужно оплачивать доставку?",
          a: "Оплата производится после прибытия товара на наш склад в США и подтверждения веса посылки.",
        },
        {
          q: "Кто оплачивает таможенные пошлины?",
          a: "Если стоимость вашей посылки превышает беспошлинный лимит (обычно $200-300 в зависимости от страны), вам нужно будет оплатить таможенные сборы. Мы предоставим полную информацию и поможем с оформлением.",
        },
        {
          q: "Включены ли налоги в стоимость доставки?",
          a: "Стоимость доставки включает только транспортные расходы. Таможенные пошлины оплачиваются отдельно по законам страны назначения.",
        },
      ],
    },
    {
      category: "Проблемы и возвраты",
      questions: [
        {
          q: "Что делать, если посылка повреждена?",
          a: "Сфотографируйте повреждения и свяжитесь с поддержкой в течение 48 часов. Мы проведём расследование и компенсируем ущерб согласно условиям страхования.",
        },
        {
          q: "Можно ли вернуть товар обратно в США?",
          a: "Да, мы можем организовать обратную отправку. Свяжитесь с поддержкой для уточнения стоимости и условий.",
        },
        {
          q: "Посылка потерялась, что делать?",
          a: "Мы несём ответственность за каждую посылку. Если товар утерян по нашей вине, мы полностью компенсируем его стоимость согласно декларированной цене.",
        },
        {
          q: "Не пришла часть товара из посылки",
          a: "Проверьте комплектность при получении и немедленно сообщите нам о недостаче. Мы проведём проверку и решим проблему.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-balance">Часто задаваемые вопросы</h1>
          <p className="text-lg text-slate-600 text-pretty leading-relaxed">
            Здесь вы найдёте ответы на самые популярные вопросы о работе OWAY CARGO. Не нашли нужную информацию?
            Свяжитесь с нашей службой поддержки.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          {faqCategories.map((category, categoryIdx) => (
            <div key={categoryIdx} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{category.category}</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((item, itemIdx) => (
                  <AccordionItem
                    key={itemIdx}
                    value={`item-${categoryIdx}-${itemIdx}`}
                    className="border border-slate-200 rounded-xl px-6 data-[state=open]:bg-blue-50/50"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-semibold text-slate-900">{item.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed pb-4">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact Support CTA */}
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Не нашли ответ на свой вопрос?</h2>
          <p className="text-blue-100 mb-8 leading-relaxed">
            Наша служба поддержки работает 24/7 и готова помочь вам в любое время. Мы ответим на все ваши вопросы и
            решим любые проблемы.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://client.owaycargo.com" target="_blank" rel="noopener noreferrer"><Button className="bg-orange-500 hover:bg-orange-600 text-white">Написать в поддержку</Button></a>
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
              Позвонить: +1 (555) 123-4567
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
