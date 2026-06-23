/// <reference path='_references.ts' />

module GameApp {
   'use strict';

   export class I18n {
      private static storageKey: string = 'candy-crush-language';
      private static defaultLanguage: string = 'en';
      private static translations: any = {
         en: {
            htmlLang: 'en',
            documentTitle: 'Candy Match',
            switchTo: '中文',
            switchLabel: 'Switch language',
            loading: 'Loading...',
            level: 'Level:',
            score: 'Score:',
            time: 'Time:',
            done: 'Done',
            gameOver: 'Game over',
            levelComplete: 'Level complete'
         },
         zh: {
            htmlLang: 'zh-CN',
            documentTitle: '糖果消消乐',
            switchTo: 'EN',
            switchLabel: '切换语言',
            loading: '加载中...',
            level: '关卡：',
            score: '分数：',
            time: '时间：',
            done: '完成',
            gameOver: '游戏结束',
            levelComplete: '关卡完成'
         }
      };
      private static currentLanguage: string = I18n.readStoredLanguage() || I18n.detectLanguage();

      static getLanguage(): string {
         return I18n.currentLanguage;
      }

      static setLanguage(language: string) {
         language = I18n.normalizeLanguage(language);

         if (language === I18n.currentLanguage) {
            return;
         }

         I18n.currentLanguage = language;
         I18n.storeLanguage(language);
         I18n.applyDocumentLanguage();
         I18n.dispatchLanguageChange();
      }

      static toggleLanguage() {
         I18n.setLanguage(I18n.currentLanguage === 'zh' ? 'en' : 'zh');
      }

      static createSwitcher() {
         var switcher = document.getElementById('language-switch');

         if (!switcher) {
            switcher = document.createElement('button');
            switcher.id = 'language-switch';
            switcher.className = 'language-switch';
            switcher.setAttribute('type', 'button');
            document.body.appendChild(switcher);

            switcher.addEventListener('click', function(event) {
               event.preventDefault();
               event.stopPropagation();
               I18n.toggleLanguage();
            });

            switcher.addEventListener('mousedown', function(event) {
               event.stopPropagation();
            });

            switcher.addEventListener('touchstart', function(event) {
               event.stopPropagation();
            });
         }

         I18n.applyDocumentLanguage();
      }

      static applyDocumentLanguage() {
         var bundle = I18n.getBundle(I18n.currentLanguage);
         document.documentElement.lang = bundle.htmlLang;
         document.title = bundle.documentTitle;

         var switcher = document.getElementById('language-switch');
         if (switcher) {
            switcher.textContent = bundle.switchTo;
            switcher.setAttribute('aria-label', bundle.switchLabel);
            switcher.setAttribute('title', bundle.switchLabel);
         }
      }

      static t(key: string): string {
         var value = I18n.getBundle(I18n.currentLanguage)[key];

         if (typeof value === 'undefined') {
            value = I18n.getBundle(I18n.defaultLanguage)[key];
         }

         return typeof value === 'undefined' ? key : value;
      }

      private static normalizeLanguage(language: string): string {
         if (!language) {
            return I18n.defaultLanguage;
         }

         return /^zh/i.test(language) ? 'zh' : 'en';
      }

      private static detectLanguage(): string {
         var nav: any = window.navigator;
         var languages = nav.languages;

         if (languages && languages.length > 0) {
            return I18n.normalizeLanguage(languages[0]);
         }

         return I18n.normalizeLanguage(nav.language || nav.userLanguage);
      }

      private static readStoredLanguage(): string {
         try {
            var language = window.localStorage.getItem(I18n.storageKey);
            return I18n.translations[language] ? language : null;
         } catch (e) {
            return null;
         }
      }

      private static storeLanguage(language: string) {
         try {
            window.localStorage.setItem(I18n.storageKey, language);
         } catch (e) {
         }
      }

      private static getBundle(language: string): any {
         return I18n.translations[language] || I18n.translations[I18n.defaultLanguage];
      }

      private static dispatchLanguageChange() {
         var event: any;

         if (typeof (<any>window).CustomEvent === 'function') {
            event = new (<any>window).CustomEvent('candy:languagechange', {
               detail: { language: I18n.currentLanguage }
            });
         } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent('candy:languagechange', false, false, {
               language: I18n.currentLanguage
            });
         }

         window.dispatchEvent(event);
      }
   }

   I18n.applyDocumentLanguage();
}
