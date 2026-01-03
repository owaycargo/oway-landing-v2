import { Package, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  const currentRates = {
    USD_RUB: "92.50",
    USD_BYN: "3.25",
    USD_KGS: "87.60",
  }

  return (
    <footer id="contact" className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-white">OWAY CARGO</div>
                <div className="text-xs text-slate-300">USA → СНГ</div>
              </div>
            </div>
            <p className="text-sm text-slate-300">Международная доставка посылок из США в страны СНГ</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Услуги
                </a>
              </li>
              <li>
                <a href="#map" className="hover:text-blue-400 transition-colors">
                  Пункты приёма
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-blue-400 transition-colors">
                  Калькулятор
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  О компании
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold text-white mb-4">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:info@owaycargo.com" className="hover:text-blue-400 transition-colors">
                  info@owaycargo.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">
                  +1 (234) 567-8900
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5" />
                <span>Delaware, USA</span>
              </li>
            </ul>
          </div>

          {/* Currency rates */}
          <div>
            <h3 className="font-semibold text-white mb-4">Курсы валют</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>USD → RUB:</span>
                <span className="font-semibold text-white">{currentRates.USD_RUB}</span>
              </div>
              <div className="flex justify-between">
                <span>USD → BYN:</span>
                <span className="font-semibold text-white">{currentRates.USD_BYN}</span>
              </div>
              <div className="flex justify-between">
                <span>USD → KGS:</span>
                <span className="font-semibold text-white">{currentRates.USD_KGS}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social and copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© 2025 OWAY CARGO. Все права защищены.</p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
