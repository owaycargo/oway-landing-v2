"use client"

import { Package, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-lg text-slate-900">OWAY CARGO</div>
            <div className="text-xs text-slate-600 -mt-1">USA → СНГ</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm shrink-0">
          <a href="/#services" className="text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">
            Услуги
          </a>
          <a href="/#marketplace" className="text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">
            Магазины
          </a>
          <a href="/#map" className="text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">
            Пункты приёма
          </a>
          <a href="/#calculator" className="text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">
            Калькулятор
          </a>
          <Link href="/about" className="text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">
            О нас
          </Link>
          <Link href="/faq" className="text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">
            FAQ
          </Link>
          <a href="/#contact" className="text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">
            Контакты
          </a>
        </nav>

        <Button className="hidden md:flex shrink-0 bg-orange-600 hover:bg-orange-700 text-white whitespace-nowrap">Личный кабинет</Button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-lg">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            <a
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 hover:text-blue-600 transition-colors py-2"
            >
              Услуги
            </a>
            <a
              href="/#marketplace"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 hover:text-blue-600 transition-colors py-2"
            >
              Магазины
            </a>
            <a
              href="/#map"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 hover:text-blue-600 transition-colors py-2"
            >
              Пункты приёма
            </a>
            <a
              href="/#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 hover:text-blue-600 transition-colors py-2"
            >
              Калькулятор
            </a>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 hover:text-blue-600 transition-colors py-2"
            >
              О нас
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 hover:text-blue-600 transition-colors py-2"
            >
              FAQ
            </Link>
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 hover:text-blue-600 transition-colors py-2"
            >
              Контакты
            </a>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white w-full mt-2">Личный кабинет</Button>
          </nav>
        </div>
      )}
    </header>
  )
}
