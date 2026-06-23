/// <reference path='../../../../typings/angularjs/angular.d.ts' />
var GameApp;
(function (GameApp) {
    'use strict';
    angular.module('GameApp', []);
})(GameApp || (GameApp = {}));

/// <reference path='_references.ts' />
var GameApp;
(function (GameApp) {
    'use strict';
    var IndexController = (function () {
        function IndexController() {
            console.log('Game started');
        }
        return IndexController;
    }());
    GameApp.IndexController = IndexController;
    angular.module('GameApp').controller('IndexController', IndexController);
})(GameApp || (GameApp = {}));

/// <reference path='_references.ts' />
var GameApp;
(function (GameApp) {
    'use strict';
    var I18n = (function () {
        function I18n() {
        }
        I18n.getLanguage = function () {
            return I18n.currentLanguage;
        };
        I18n.setLanguage = function (language) {
            language = I18n.normalizeLanguage(language);
            if (language === I18n.currentLanguage) {
                return;
            }
            I18n.currentLanguage = language;
            I18n.storeLanguage(language);
            I18n.applyDocumentLanguage();
            I18n.dispatchLanguageChange();
        };
        I18n.toggleLanguage = function () {
            I18n.setLanguage(I18n.currentLanguage === 'zh' ? 'en' : 'zh');
        };
        I18n.createSwitcher = function () {
            var switcher = document.getElementById('language-switch');
            if (!switcher) {
                switcher = document.createElement('button');
                switcher.id = 'language-switch';
                switcher.className = 'language-switch';
                switcher.setAttribute('type', 'button');
                document.body.appendChild(switcher);
                switcher.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    I18n.toggleLanguage();
                });
                switcher.addEventListener('mousedown', function (event) {
                    event.stopPropagation();
                });
                switcher.addEventListener('touchstart', function (event) {
                    event.stopPropagation();
                });
            }
            I18n.applyDocumentLanguage();
        };
        I18n.applyDocumentLanguage = function () {
            var bundle = I18n.getBundle(I18n.currentLanguage);
            document.documentElement.lang = bundle.htmlLang;
            document.title = bundle.documentTitle;
            var switcher = document.getElementById('language-switch');
            if (switcher) {
                switcher.textContent = bundle.switchTo;
                switcher.setAttribute('aria-label', bundle.switchLabel);
                switcher.setAttribute('title', bundle.switchLabel);
            }
        };
        I18n.t = function (key) {
            var value = I18n.getBundle(I18n.currentLanguage)[key];
            if (typeof value === 'undefined') {
                value = I18n.getBundle(I18n.defaultLanguage)[key];
            }
            return typeof value === 'undefined' ? key : value;
        };
        I18n.normalizeLanguage = function (language) {
            if (!language) {
                return I18n.defaultLanguage;
            }
            return /^zh/i.test(language) ? 'zh' : 'en';
        };
        I18n.detectLanguage = function () {
            var nav = window.navigator;
            var languages = nav.languages;
            if (languages && languages.length > 0) {
                return I18n.normalizeLanguage(languages[0]);
            }
            return I18n.normalizeLanguage(nav.language || nav.userLanguage);
        };
        I18n.readStoredLanguage = function () {
            try {
                var language = window.localStorage.getItem(I18n.storageKey);
                return I18n.translations[language] ? language : null;
            }
            catch (e) {
                return null;
            }
        };
        I18n.storeLanguage = function (language) {
            try {
                window.localStorage.setItem(I18n.storageKey, language);
            }
            catch (e) {
            }
        };
        I18n.getBundle = function (language) {
            return I18n.translations[language] || I18n.translations[I18n.defaultLanguage];
        };
        I18n.dispatchLanguageChange = function () {
            var event;
            if (typeof window.CustomEvent === 'function') {
                event = new window.CustomEvent('candy:languagechange', {
                    detail: { language: I18n.currentLanguage }
                });
            }
            else {
                event = document.createEvent('CustomEvent');
                event.initCustomEvent('candy:languagechange', false, false, {
                    language: I18n.currentLanguage
                });
            }
            window.dispatchEvent(event);
        };
        I18n.storageKey = 'candy-crush-language';
        I18n.defaultLanguage = 'en';
        I18n.translations = {
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
        I18n.currentLanguage = I18n.readStoredLanguage() || I18n.detectLanguage();
        return I18n;
    }());
    GameApp.I18n = I18n;
    I18n.applyDocumentLanguage();
})(GameApp || (GameApp = {}));

/// <reference path='../_references.ts' />
var GameApp;
(function (GameApp) {
    var Models;
    (function (Models) {
        'use strict';
        (function (ChainType) {
            ChainType[ChainType["chainTypeHorizontal"] = 0] = "chainTypeHorizontal";
            ChainType[ChainType["chainTypeVertical"] = 1] = "chainTypeVertical";
        })(Models.ChainType || (Models.ChainType = {}));
        var ChainType = Models.ChainType;
        var Chain = (function () {
            function Chain() {
            }
            Chain.prototype.addCookie = function (cookie) {
                if (this.cookies == null) {
                    this.cookies = [];
                }
                this.cookies.push(cookie);
            };
            Chain.prototype.getCookies = function () {
                return this.cookies;
            };
            return Chain;
        }());
        Models.Chain = Chain;
    })(Models = GameApp.Models || (GameApp.Models = {}));
})(GameApp || (GameApp = {}));

/// <reference path='../_references.ts' />
var GameApp;
(function (GameApp) {
    var Models;
    (function (Models) {
        'use strict';
        var Tile = (function () {
            function Tile() {
            }
            Tile.prototype.tileAtColumn = function (column, row) {
                return null;
            };
            return Tile;
        }());
        Models.Tile = Tile;
    })(Models = GameApp.Models || (GameApp.Models = {}));
})(GameApp || (GameApp = {}));

/// <reference path='../_references.ts' />
var GameApp;
(function (GameApp) {
    var Models;
    (function (Models) {
        'use strict';
        (function (CookieType) {
            CookieType[CookieType["croissant"] = 1] = "croissant";
            CookieType[CookieType["cupcake"] = 2] = "cupcake";
            CookieType[CookieType["danish"] = 3] = "danish";
            CookieType[CookieType["donut"] = 4] = "donut";
            CookieType[CookieType["macaroon"] = 5] = "macaroon";
            CookieType[CookieType["sugarCookie"] = 6] = "sugarCookie";
        })(Models.CookieType || (Models.CookieType = {}));
        var CookieType = Models.CookieType;
        var Cookie = (function () {
            function Cookie(column, row, cookieType) {
                this.spriteNames = [
                    "Croissant",
                    "Cupcake",
                    "Danish",
                    "Donut",
                    "Macaroon",
                    "SugarCookie"
                ];
                this.highlightedSpriteNames = [
                    "Croissant-Highlighted",
                    "Cupcake-Highlighted",
                    "Danish-Highlighted",
                    "Donut-Highlighted",
                    "Macaroon-Highlighted",
                    "SugarCookie-Highlighted",
                ];
                this.column = column;
                this.row = row;
                this.cookieType = cookieType;
            }
            Cookie.prototype.spriteName = function () {
                return this.spriteNames[this.cookieType - 1];
            };
            Cookie.prototype.highlightedSpriteName = function () {
                return this.highlightedSpriteNames[this.cookieType - 1];
            };
            return Cookie;
        }());
        Models.Cookie = Cookie;
    })(Models = GameApp.Models || (GameApp.Models = {}));
})(GameApp || (GameApp = {}));

/// <reference path='../_references.ts' />
var GameApp;
(function (GameApp) {
    var Models;
    (function (Models) {
        'use strict';
        var Level = (function () {
            function Level(gameConfig) {
                this.config = gameConfig;
                this.createCookiesArray();
            }
            Level.prototype.shuffle = function () {
                var set;
                do {
                    set = this.createInitialCookies();
                    this.detectPossibleSwaps();
                } while (this.possibleSwaps.length == 0);
                console.log(this.possibleSwaps);
                return set;
            };
            Level.prototype.isPossibleSwap = function (other) {
                for (var i = 0; i < this.possibleSwaps.length; i++) {
                    var possibleSwap = this.possibleSwaps[i];
                    var isPossible = (this.isTwoCookiesEquals(other.cookieA, possibleSwap.cookieA) && this.isTwoCookiesEquals(other.cookieB, possibleSwap.cookieB)) ||
                        (this.isTwoCookiesEquals(other.cookieB, possibleSwap.cookieA) && this.isTwoCookiesEquals(other.cookieA, possibleSwap.cookieB));
                    if (isPossible)
                        return true;
                }
                return false;
            };
            Level.prototype.getPossibleSwaps = function () {
                return this.possibleSwaps;
            };
            Level.prototype.createInitialCookies = function () {
                var array = [];
                for (var row = 0; row < this.config.numRows; row++) {
                    for (var column = 0; column < this.config.numColumns; column++) {
                        if (this.tiles[column][row] != null) {
                            var cookieType = this.calculateCookieType(column, row);
                            var cookie = this.createCookieAtColumn(column, row, cookieType);
                            array.push(cookie);
                        }
                        else {
                            this.cookies[column][row] = null;
                        }
                    }
                }
                return array;
            };
            Level.prototype.cookieAtPosition = function (column, row) {
                return this.cookies[column][row];
            };
            Level.prototype.tileAtColumn = function (column, row) {
                return this.tiles[column][row];
            };
            Level.prototype.initWithData = function (level) {
                this.createTilesArray();
                for (var row = 0; row < this.config.numRows; row++) {
                    for (var column = 0; column < this.config.numColumns; column++) {
                        var tile = level.tiles[column][row];
                        if (tile == 1) {
                            this.tiles[column][row] = new Models.Tile();
                        }
                        else {
                            this.tiles[column][row] = null;
                        }
                    }
                }
            };
            Level.prototype.performSwap = function (swap) {
                var columnA = swap.cookieA.column, rowA = swap.cookieA.row, columnB = swap.cookieB.column, rowB = swap.cookieB.row;
                this.cookies[columnA][rowA] = swap.cookieB;
                swap.cookieB.column = columnA;
                swap.cookieB.row = rowA;
                this.cookies[columnB][rowB] = swap.cookieA;
                swap.cookieA.column = columnB;
                swap.cookieA.row = rowB;
            };
            Level.prototype.removeMatches = function () {
                var horizontalChains = this.detectHorizontalMatches();
                var verticalChains = this.detectVerticalMatches();
                this.removeCookies(horizontalChains);
                this.removeCookies(verticalChains);
                this.calculateScores(horizontalChains);
                this.calculateScores(verticalChains);
                return horizontalChains.concat(verticalChains);
            };
            Level.prototype.calculateScores = function (chains) {
                chains.forEach(function (chain) {
                    chain.score = 60 * (chain.cookies.length - 2);
                });
            };
            Level.prototype.fillHoles = function () {
                var columns = [];
                // 1
                for (var column = 0; column < this.config.numColumns; column++) {
                    var array;
                    for (var row = 0; row < this.config.numRows; row++) {
                        // 2
                        if (this.tiles[column][row] != null && this.cookies[column][row] == null) {
                            // 3
                            for (var lookup = row + 1; lookup < this.config.numRows; lookup++) {
                                var cookie = this.cookies[column][lookup];
                                if (cookie != null) {
                                    // 4
                                    this.cookies[column][lookup] = null;
                                    this.cookies[column][row] = cookie;
                                    cookie.row = row;
                                    // 5
                                    if (array == null) {
                                        array = [];
                                        columns.push(array);
                                    }
                                    array.push(cookie);
                                    // 6
                                    break;
                                }
                            }
                        }
                    }
                }
                return columns;
            };
            Level.prototype.topUpCookies = function () {
                var columns = [];
                var cookieType = 0;
                for (var column = 0; column < this.config.numColumns; column++) {
                    var array;
                    // 1
                    for (var row = this.config.numRows - 1; row >= 0 && this.cookies[column][row] == null; row--) {
                        // 2
                        if (this.tiles[column][row] != null) {
                            // 3
                            var newCookieType;
                            do {
                                newCookieType = GameApp.GameHelpers.getRandomNumber(6);
                            } while (newCookieType == cookieType);
                            cookieType = newCookieType;
                            // 4
                            var cookie = this.createCookieAtColumn(column, row, newCookieType);
                            // 5
                            if (array == null) {
                                array = [];
                                columns.push(array);
                            }
                            array.push(cookie);
                        }
                    }
                }
                this.detectPossibleSwaps();
                return columns;
            };
            Level.prototype.createCookieAtColumn = function (column, row, cookieType) {
                var cookie = new Models.Cookie(column, row, cookieType);
                this.cookies[column][row] = cookie;
                return cookie;
            };
            Level.prototype.createCookiesArray = function () {
                this.cookies = new Array(this.config.numColumns - 1);
                for (var i = 0; i < this.config.numColumns; i++) {
                    this.cookies[i] = new Array(this.config.numRows - 1);
                }
            };
            Level.prototype.createTilesArray = function () {
                this.tiles = new Array(this.config.numColumns - 1);
                for (var i = 0; i < this.config.numColumns; i++) {
                    this.tiles[i] = new Array(this.config.numRows - 1);
                }
            };
            Level.prototype.isTwoCookiesEquals = function (cookieA, cookieB) {
                return cookieA.column == cookieB.column && cookieA.row == cookieB.row && cookieA.cookieType == cookieB.cookieType;
            };
            Level.prototype.hasChainAtColumn = function (column, row) {
                var cookie = this.cookies[column][row], cookieType;
                if (cookie) {
                    cookieType = cookie.cookieType;
                }
                else {
                    cookieType = 0;
                }
                var horzLength = 1;
                for (var i = column - 1; i >= 0 && this.cookies[i][row] && this.cookies[i][row].cookieType == cookieType; i--, horzLength++)
                    ;
                for (var i = column + 1; i < this.config.numColumns && this.cookies[i][row] && this.cookies[i][row].cookieType == cookieType; i++, horzLength++)
                    ;
                if (horzLength >= 3)
                    return true;
                var vertLength = 1;
                for (var i = row - 1; i >= 0 && this.cookies[column][i] && this.cookies[column][i].cookieType == cookieType; i--, vertLength++)
                    ;
                for (var i = row + 1; i < this.config.numRows && this.cookies[column][i] && this.cookies[column][i].cookieType == cookieType; i++, vertLength++)
                    ;
                return (vertLength >= 3);
            };
            Level.prototype.detectPossibleSwaps = function () {
                var possibleSwaps = [];
                for (var row = 0; row < this.config.numRows; row++) {
                    for (var column = 0; column < this.config.numColumns; column++) {
                        var cookie = this.cookies[column][row];
                        if (cookie) {
                            // Is it possible to swap this cookie with the one on the right?
                            if (column < this.config.numColumns - 1) {
                                // Have a cookie in this spot? If there is no tile, there is no cookie.
                                var other = this.cookies[column + 1][row];
                                if (other) {
                                    // Swap them
                                    this.cookies[column][row] = other;
                                    this.cookies[column + 1][row] = cookie;
                                    // Is either cookie now part of a chain?
                                    if (this.hasChainAtColumn(column + 1, row) ||
                                        this.hasChainAtColumn(column, row)) {
                                        var swap = new Models.Swap();
                                        swap.cookieA = cookie;
                                        swap.cookieB = other;
                                        possibleSwaps.push(swap);
                                    }
                                    // Swap them back
                                    this.cookies[column][row] = cookie;
                                    this.cookies[column + 1][row] = other;
                                }
                            }
                            if (row < this.config.numRows - 1) {
                                var other = this.cookies[column][row + 1];
                                if (other) {
                                    // Swap them
                                    this.cookies[column][row] = other;
                                    this.cookies[column][row + 1] = cookie;
                                    if (this.hasChainAtColumn(column, row + 1) ||
                                        this.hasChainAtColumn(column, row)) {
                                        var swap = new Models.Swap();
                                        swap.cookieA = cookie;
                                        swap.cookieB = other;
                                        possibleSwaps.push(swap);
                                    }
                                    this.cookies[column][row] = cookie;
                                    this.cookies[column][row + 1] = other;
                                }
                            }
                        }
                    }
                }
                this.possibleSwaps = possibleSwaps;
            };
            Level.prototype.calculateCookieType = function (column, row) {
                var cookieType;
                do {
                    cookieType = GameApp.GameHelpers.getRandomNumber(this.config.numCookieTypes);
                } while (this.whereIsAlreadyTwoCookies(column, row, cookieType));
                return cookieType;
            };
            Level.prototype.whereIsAlreadyTwoCookies = function (column, row, cookieType) {
                return (column >= 2 &&
                    this.cookies[column - 1][row] &&
                    this.cookies[column - 2][row] &&
                    this.cookies[column - 1][row].cookieType == cookieType &&
                    this.cookies[column - 2][row].cookieType == cookieType)
                    ||
                        (row >= 2 &&
                            this.cookies[column][row - 1] &&
                            this.cookies[column][row - 2] &&
                            this.cookies[column][row - 1].cookieType == cookieType &&
                            this.cookies[column][row - 2].cookieType == cookieType);
            };
            Level.prototype.detectHorizontalMatches = function () {
                var set = [];
                for (var row = 0; row < this.config.numRows; row++) {
                    for (var column = 0; column < this.config.numColumns - 2;) {
                        if (this.cookies[column][row] != null) {
                            var matchType = this.cookies[column][row].cookieType;
                            if (this.cookies[column + 1][row] && this.cookies[column + 1][row].cookieType == matchType &&
                                this.cookies[column + 2][row] && this.cookies[column + 2][row].cookieType == matchType) {
                                var chain = new Models.Chain();
                                chain.chainType = Models.ChainType.chainTypeHorizontal;
                                do {
                                    chain.addCookie(this.cookies[column][row]);
                                    column += 1;
                                } while (column < this.config.numColumns && this.cookies[column][row] && this.cookies[column][row].cookieType == matchType);
                                set.push(chain);
                                continue;
                            }
                        }
                        column += 1;
                    }
                }
                return set;
            };
            Level.prototype.detectVerticalMatches = function () {
                var set = [];
                for (var column = 0; column < this.config.numColumns; column++) {
                    for (var row = 0; row < this.config.numRows - 2;) {
                        if (this.cookies[column][row] != null) {
                            var matchType = this.cookies[column][row].cookieType;
                            if (this.cookies[column][row + 1] && this.cookies[column][row + 1].cookieType == matchType &&
                                this.cookies[column][row + 2] && this.cookies[column][row + 2].cookieType == matchType) {
                                var chain = new Models.Chain();
                                chain.chainType = Models.ChainType.chainTypeVertical;
                                do {
                                    chain.addCookie(this.cookies[column][row]);
                                    row += 1;
                                } while (row < this.config.numRows && this.cookies[column][row] && this.cookies[column][row].cookieType == matchType);
                                set.push(chain);
                                continue;
                            }
                        }
                        row += 1;
                    }
                }
                return set;
            };
            Level.prototype.removeCookies = function (chains) {
                var _this = this;
                chains.forEach(function (chain) {
                    chain.cookies.forEach(function (cookie) {
                        _this.cookies[cookie.column][cookie.row] = null;
                    });
                });
            };
            return Level;
        }());
        Models.Level = Level;
    })(Models = GameApp.Models || (GameApp.Models = {}));
})(GameApp || (GameApp = {}));

/// <reference path='../_references.ts' />
var GameApp;
(function (GameApp) {
    var Models;
    (function (Models) {
        'use strict';
        var Swap = (function () {
            function Swap() {
            }
            return Swap;
        }());
        Models.Swap = Swap;
    })(Models = GameApp.Models || (GameApp.Models = {}));
})(GameApp || (GameApp = {}));

/// <reference path='../_references.ts' />
var GameApp;
(function (GameApp) {
    var Models;
    (function (Models) {
        'use strict';
        var Config = (function () {
            function Config(numColumns, numRows, numCookieTypes) {
                this.numColumns = numColumns;
                this.numRows = numRows;
                this.numCookieTypes = numCookieTypes;
            }
            return Config;
        }());
        Models.Config = Config;
    })(Models = GameApp.Models || (GameApp.Models = {}));
})(GameApp || (GameApp = {}));

/// <reference path='../_references.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameApp;
(function (GameApp) {
    var States;
    (function (States) {
        'use strict';
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.preload = function () {
            };
            Boot.prototype.create = function () {
                //  Unless you specifically need to support multitouch I would recommend setting this to 1
                this.input.maxPointers = 1;
                //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
                this.stage.disableVisibilityChange = true;
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.pageAlignVertically = true;
                this.game.scale.refresh();
                this.game.state.start('Preloader', true, false);
            };
            return Boot;
        }(Phaser.State));
        States.Boot = Boot;
    })(States = GameApp.States || (GameApp.States = {}));
})(GameApp || (GameApp = {}));

/// <reference path='../_references.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameApp;
(function (GameApp) {
    var States;
    (function (States) {
        'use strict';
        var Preloader = (function (_super) {
            __extends(Preloader, _super);
            function Preloader() {
                _super.apply(this, arguments);
            }
            Preloader.prototype.preload = function () {
                var assets = 'app/game/assets/';
                var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, GameApp.I18n.t('loading'), {
                    font: "bold 42px Arial, Microsoft YaHei, PingFang SC, sans-serif",
                    fill: "#ff0044",
                    align: "center"
                });
                text.anchor.set(0.5, 0.5);
                this.game.load.image('logo', assets + 'logo.png'); //TODO: remove not used assets
                this.game.load.image('bg', assets + 'Background@2x.png');
                this.game.load.image('levelComplete', assets + 'LevelComplete@2x.png');
                this.game.load.spritesheet("GEMS", assets + 'diamonds32x5.png', 32, 32);
                this.game.load.image('Croissant', assets + 'Croissant@2x.png');
                this.game.load.image('Cupcake', assets + 'Cupcake@2x.png');
                this.game.load.image('Danish', assets + 'Danish@2x.png');
                this.game.load.image('Donut', assets + 'Donut@2x.png');
                this.game.load.image('Macaroon', assets + 'Macaroon@2x.png');
                this.game.load.image('SugarCookie', assets + 'SugarCookie@2x.png');
                this.game.load.image('Tile', assets + 'Tile@2x.png');
                this.game.load.image('TileEmpty', assets + 'TileEmpty.png');
                this.game.load.json('level0', assets + 'levels/Level_0.json');
                this.game.load.json('level1', assets + 'levels/Level_1.json');
                this.game.load.json('level2', assets + 'levels/Level_2.json');
                this.game.load.json('level3', assets + 'levels/Level_3.json');
                this.game.load.json('level4', assets + 'levels/Level_4.json');
                this.game.load.json('level5', assets + 'levels/Level_5.json');
                this.game.load.audio('swapSound', assets + 'sounds/Chomp.wav');
                this.game.load.audio('invalidSwapSound', assets + 'sounds/Error.wav');
                this.game.load.audio('matchSound', assets + 'sounds/Ka-Ching.wav');
                this.game.load.audio('fallingCookieSound', assets + 'sounds/Scrape.wav');
                this.game.load.audio('addCookieSound', assets + 'sounds/Drip.wav');
                this.game.load.audio('bgMusic', assets + 'sounds/mining-by-moonlight.mp3');
            };
            Preloader.prototype.create = function () {
                this.game.state.states['GameScene'].levelNumber = 0;
                this.game.state.start('GameScene', true, false);
            };
            return Preloader;
        }(Phaser.State));
        States.Preloader = Preloader;
    })(States = GameApp.States || (GameApp.States = {}));
})(GameApp || (GameApp = {}));

/// <reference path='../_references.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObjects = GameApp.Models;
var Level = GameObjects.Level;
var Swap = GameObjects.Swap;
var Cookie = GameObjects.Cookie;
var Chain = GameObjects.Chain;
var GameConfig = GameObjects.Config;
var GameApp;
(function (GameApp) {
    var States;
    (function (States) {
        'use strict';
        var GameScene = (function (_super) {
            __extends(GameScene, _super);
            function GameScene() {
                _super.apply(this, arguments);
                this.tileWidth = 64.0;
                this.tileHeight = 72.0;
                this.marginYDelta = 50;
                this.isPossibleSwap = false;
            }
            GameScene.prototype.create = function () {
                var _this = this;
                var levelNumber = this.game.state.states['GameScene'].levelNumber;
                var bg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg');
                bg.anchor.setTo(0.5, 0.5);
                this.game.sound.play('bgMusic');
                this.createLevelText(levelNumber + 1);
                this.initScore();
                this.createScoreText();
                this.swapSound = this.game.add.audio('swapSound');
                this.invalidSwapSound = this.game.add.audio('invalidSwapSound');
                this.matchSound = this.game.add.audio('matchSound');
                this.fallingCookieSound = this.game.add.audio('fallingCookieSound');
                this.addCookieSound = this.game.add.audio('addCookieSound');
                this.gameTimer = new States.GameTimer(this.game);
                this.gameTimer.createTimer();
                this.game.input.addMoveCallback(this.touchesMoved, this);
                this.initLevel('level' + levelNumber);
                this.beginGame();
                this.languageChangeHandler = function () {
                    _this.updateLanguageTexts();
                };
                window.addEventListener('candy:languagechange', this.languageChangeHandler);
            };
            GameScene.prototype.initScore = function () {
                var scoreFromState = this.game.state.states['GameScene'].score;
                if (scoreFromState != null) {
                    this.score = scoreFromState;
                }
                else {
                    this.score = 0;
                }
            };
            GameScene.prototype.createLevelText = function (levelNumber) {
                this.levelLabel = this.game.add.text(550, 20, GameApp.I18n.t('level'), {
                    font: "Gill Sans Bold, Arial, Microsoft YaHei, PingFang SC, sans-serif",
                    fill: "white",
                    align: "center",
                    fontSize: 20
                });
                this.levelLabel.setShadow(-1, 1, 'rgba(0,0,0,0.5)', 0);
                this.levelText = this.game.add.text(550, 40, "" + levelNumber, {
                    font: "Gill Sans Bold, Arial, Microsoft YaHei, PingFang SC, sans-serif",
                    fill: "white",
                    align: "center",
                    fontSize: 30
                });
                this.levelText.setShadow(-1, 1, 'rgba(0,0,0,0.5)', 0);
            };
            GameScene.prototype.createScoreText = function () {
                this.scoreLabel = this.game.add.text(this.game.world.centerX, 20, GameApp.I18n.t('score'), {
                    font: "Gill Sans Bold, Arial, Microsoft YaHei, PingFang SC, sans-serif",
                    fill: "white",
                    fontSize: 20
                });
                this.scoreLabel.setShadow(-1, 1, 'rgba(0,0,0,0.5)', 0);
                this.scoreText = this.game.add.text(this.game.world.centerX, 40, "" + this.score, {
                    font: "Gill Sans Bold, Arial, Microsoft YaHei, PingFang SC, sans-serif",
                    fill: "white",
                    fontSize: 30
                });
                this.scoreText.setShadow(-1, 1, 'rgba(0,0,0,0.5)', 0);
            };
            GameScene.prototype.updateScoreText = function () {
                this.scoreText.text = "" + this.score;
            };
            GameScene.prototype.updateLanguageTexts = function () {
                if (this.levelLabel) {
                    this.levelLabel.text = GameApp.I18n.t('level');
                }
                if (this.scoreLabel) {
                    this.scoreLabel.text = GameApp.I18n.t('score');
                }
                if (this.gameTimer) {
                    this.gameTimer.updateLabels();
                }
            };
            GameScene.prototype.initLevel = function (levelName) {
                var levelData = this.game.cache.getJSON(levelName);
                if (levelData == null) {
                    throw 'Cannot load level data';
                }
                var gameConfig = new GameConfig(9, 9, 6);
                this.level = new Level(gameConfig);
                this.level.initWithData(levelData);
                this.addTiles();
            };
            GameScene.prototype.render = function () {
                this.gameTimer.renderTimer();
            };
            GameScene.prototype.beginGame = function () {
                this.userInteractionEnabled = true;
                this.shuffle();
            };
            GameScene.prototype.shuffle = function () {
                var cookies = this.level.shuffle();
                this.addSpritesForCookies(cookies);
            };
            GameScene.prototype.addSpritesForCookies = function (cookies) {
                var _this = this;
                this.cookieLayer = this.game.add.group();
                this.cookieLayer.z = 2;
                cookies.forEach(function (cookie) {
                    var point = _this.pointForCookie(cookie.column, cookie.row);
                    var createdCookie = _this.cookieLayer.create(point.x, point.y, cookie.spriteName());
                    createdCookie.inputEnabled = true;
                    createdCookie.events.onInputDown.add(_this.touchesBegan, _this);
                    createdCookie.events.onInputUp.add(_this.touchesEnd, _this);
                    cookie.sprite = createdCookie;
                });
            };
            GameScene.prototype.pointForCookie = function (column, row) {
                var x = column * this.tileWidth + this.tileWidth / 2;
                var y = (row * this.tileHeight + this.tileHeight / 2) + this.marginYDelta;
                return new Phaser.Point(x, y);
            };
            GameScene.prototype.convertPoint = function (point, cookiePosition) {
                var x = point.x - 32;
                var y = point.y - 32 - this.marginYDelta;
                if (x >= 0 && x < this.level.config.numColumns * this.tileWidth &&
                    y >= 0 && y < this.level.config.numRows * this.tileHeight) {
                    cookiePosition.column = Phaser.Math.floor(x / this.tileWidth);
                    cookiePosition.row = Phaser.Math.floor((y) / this.tileHeight);
                    return true;
                }
                else {
                    return false;
                }
            };
            GameScene.prototype.addTiles = function () {
                this.tilesLayer = this.game.add.group();
                this.tilesLayer.z = 1;
                for (var row = 0; row < this.level.config.numColumns; row++) {
                    for (var column = 0; column < this.level.config.numColumns; column++) {
                        if (this.level.tileAtColumn(column, row) != null) {
                            var point = this.pointForCookie(column, row);
                            this.tilesLayer.create(point.x, point.y, 'Tile');
                        }
                    }
                }
            };
            GameScene.prototype.debugMove = function (x, y) {
                var cookiePosition = {
                    column: null,
                    row: null
                };
                var convert = this.convertPoint(new Phaser.Point(x, y), cookiePosition);
                if (convert) {
                    var cookie = this.level.cookieAtPosition(cookiePosition.column, cookiePosition.row);
                    if (cookie) {
                        console.log('actual cookie', {
                            column: cookie.column,
                            row: cookie.row
                        });
                    }
                }
                console.log('x-' + x + ' y-' + y);
                //console.log('cookie point', cookiePosition);
            };
            GameScene.prototype.touchesMoved = function (pointer, x, y, fromClick) {
                this.debugMove(x, y);
                if (this.swipeFromColumn == null)
                    return;
                if (pointer.isDown) {
                    var cookiePosition = {
                        column: null,
                        row: null
                    };
                    //TODO: need to configure this sizes
                    if (this.convertPoint(new Phaser.Point(x, y), cookiePosition)) {
                        var horzDelta = 0, vertDelta = 0;
                        if (cookiePosition.column < this.swipeFromColumn) {
                            horzDelta = -1;
                        }
                        else if (cookiePosition.column > this.swipeFromColumn) {
                            horzDelta = 1;
                        }
                        else if (cookiePosition.row < this.swipeFromRow) {
                            vertDelta = -1;
                        }
                        else if (cookiePosition.row > this.swipeFromRow) {
                            vertDelta = 1;
                        }
                        if (horzDelta != 0 || vertDelta != 0) {
                            this.trySwapHorizontal(horzDelta, vertDelta);
                            this.swipeFromColumn = null;
                        }
                    }
                }
            };
            GameScene.prototype.touchesBegan = function (selectedCookie, pointer) {
                var cookiePosition = {
                    column: null,
                    row: null
                };
                if (this.convertPoint(selectedCookie.position, cookiePosition)) {
                    if (this.level.cookieAtPosition(cookiePosition.column, cookiePosition.row)) {
                        this.swipeFromColumn = cookiePosition.column;
                        this.swipeFromRow = cookiePosition.row;
                    }
                    console.log('selectedCookie', 'column: ' + cookiePosition.column + ' row: ' + cookiePosition.row);
                }
                else {
                    this.swipeFromColumn = null;
                    this.swipeFromRow = null;
                }
            };
            GameScene.prototype.touchesEnd = function (selectedCookie, pointer) {
                this.swipeFromColumn = this.swipeFromRow = null;
                //console.log('releaseCookie', selectedCookie);
                //console.log('up from', selectedGem);
                //console.log('touchesEnd pointer', pointer.position);
                if (this.isPossibleSwap) {
                    this.handleMatches();
                }
                this.userInteractionEnabled = true;
            };
            GameScene.prototype.trySwapHorizontal = function (horzDelta, vertDelta) {
                this.userInteractionEnabled = false;
                var toColumn = this.swipeFromColumn + horzDelta;
                var toRow = this.swipeFromRow + vertDelta;
                if (toColumn < 0 || toColumn >= this.level.config.numColumns)
                    return;
                if (toRow < 0 || toRow >= this.level.config.numRows)
                    return;
                var toCookie = this.level.cookieAtPosition(toColumn, toRow);
                if (!toCookie)
                    return;
                var fromCookie = this.level.cookieAtPosition(this.swipeFromColumn, this.swipeFromRow);
                var swap = new Swap();
                swap.cookieA = fromCookie;
                swap.cookieB = toCookie;
                if (this.level.isPossibleSwap(swap)) {
                    this.userInteractionEnabled = true;
                    this.level.performSwap(swap);
                    this.animateSwap(swap);
                    this.isPossibleSwap = true;
                    console.log('Good swap');
                }
                else {
                    this.userInteractionEnabled = true;
                    this.animateInvalidSwap(swap);
                    this.isPossibleSwap = false;
                    console.log('Bad swap');
                }
            };
            GameScene.prototype.handleMatches = function () {
                var _this = this;
                var chains = this.level.removeMatches();
                if (chains.length == 0) {
                    this.beginNextTurn();
                    return;
                }
                this.animateMatchedCookies(chains);
                this.updateScore(chains);
                var columns = this.level.fillHoles();
                this.animateFallingCookies(columns);
                var newColumns = this.level.topUpCookies();
                this.animateNewCookies(newColumns, function () {
                    _this.handleMatches();
                });
            };
            GameScene.prototype.updateScore = function (chains) {
                var _this = this;
                chains.forEach(function (chain) {
                    _this.score += chain.score;
                });
                this.updateScoreText();
            };
            GameScene.prototype.beginNextTurn = function () {
                this.userInteractionEnabled = true;
            };
            GameScene.prototype.animateSwap = function (swap) {
                var _this = this;
                var cookieSrpiteA = swap.cookieA.sprite, cookieSrpiteB = swap.cookieB.sprite;
                var tween = this.game.add.tween(swap.cookieA.sprite).to({ x: cookieSrpiteB.position.x, y: cookieSrpiteB.position.y }, 100, Phaser.Easing.Linear.None, true);
                var tween2 = this.game.add.tween(swap.cookieB.sprite).to({ x: cookieSrpiteA.position.x, y: cookieSrpiteA.position.y }, 100, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(function () {
                    console.log('tween complete');
                    _this.swapSound.play();
                    _this.userInteractionEnabled = true;
                }, this);
            };
            GameScene.prototype.animateInvalidSwap = function (swap) {
                var _this = this;
                var cookieSrpiteA = swap.cookieA.sprite, cookieSrpiteB = swap.cookieB.sprite;
                var tween = this.game.add.tween(swap.cookieA.sprite).to({ x: cookieSrpiteB.position.x, y: cookieSrpiteB.position.y }, 100, Phaser.Easing.Linear.None, true);
                var tween2 = this.game.add.tween(swap.cookieB.sprite).to({ x: cookieSrpiteA.position.x, y: cookieSrpiteA.position.y }, 100, Phaser.Easing.Linear.None, true);
                tween2.onComplete.add(function () {
                    var tweenBack = _this.game.add.tween(swap.cookieB.sprite).to({ x: cookieSrpiteA.position.x, y: cookieSrpiteA.position.y }, 100, Phaser.Easing.Linear.None, true);
                    var tweenBack2 = _this.game.add.tween(swap.cookieA.sprite).to({ x: cookieSrpiteB.position.x, y: cookieSrpiteB.position.y }, 100, Phaser.Easing.Linear.None, true);
                    _this.invalidSwapSound.play();
                }, this);
            };
            GameScene.prototype.animateMatchedCookies = function (chains) {
                var _this = this;
                chains.forEach(function (chain) {
                    _this.animateScoreForChain(chain);
                    chain.cookies.forEach(function (cookie) {
                        // 1
                        if (cookie.sprite != null) {
                            // 2
                            cookie.sprite.kill();
                            _this.matchSound.play();
                            // 3
                            cookie.sprite = null;
                        }
                    });
                });
            };
            GameScene.prototype.animateFallingCookies = function (columns) {
                var _this = this;
                var longestDuration = 0;
                columns.forEach(function (cookies) {
                    var count = 0;
                    cookies.forEach(function (cookie) {
                        count++;
                        var newPosition = _this.pointForCookie(cookie.column, cookie.row);
                        var delay = 0.05 + 0.15 * count * 500;
                        var duration = ((cookie.sprite.position.y - newPosition.y) / _this.tileHeight) * 100;
                        longestDuration = Math.max(longestDuration, duration + delay);
                        var tween = _this.game.add.tween(cookie.sprite).to({ x: newPosition.x, y: newPosition.y }, duration, Phaser.Easing.Linear.None, true, delay);
                        tween.onComplete.add(function () {
                            console.log('animateFallingCookies complete', duration);
                            _this.fallingCookieSound.play();
                        });
                    });
                });
            };
            GameScene.prototype.animateNewCookies = function (columns, onComplete) {
                var _this = this;
                var longestDuration = 0;
                var tweens = [];
                columns.forEach(function (cookies) {
                    var idx = 0;
                    var startRow = cookies[0].row + 1;
                    var cookiesCount = cookies.length;
                    cookies.forEach(function (cookie) {
                        idx++;
                        var point = _this.pointForCookie(cookie.column, startRow);
                        var createdCookie = _this.cookieLayer.create(point.x, point.y, cookie.spriteName());
                        createdCookie.inputEnabled = true;
                        createdCookie.events.onInputDown.add(_this.touchesBegan, _this);
                        createdCookie.events.onInputUp.add(_this.touchesEnd, _this);
                        cookie.sprite = createdCookie;
                        var delay = 0.1 + 0.2 * (cookiesCount - idx - 1) * 150;
                        var duration = (startRow - cookie.row) * 100;
                        longestDuration = Math.max(longestDuration, duration + delay);
                        var newPoint = _this.pointForCookie(cookie.column, cookie.row);
                        createdCookie.alpha = 0;
                        var tween = _this.game.add.tween(createdCookie).to({ x: newPoint.x, y: newPoint.y, alpha: 1 }, duration, Phaser.Easing.Linear.None, true, delay);
                    });
                });
                this.game.time.events.add(longestDuration + 100, onComplete, this);
            };
            GameScene.prototype.animateScoreForChain = function (chain) {
                var firstCookie = chain.cookies[0];
                var lastCookie = chain.cookies[chain.cookies.length - 1];
                var x = (firstCookie.sprite.position.x + lastCookie.sprite.position.x + 30) / 2;
                var y = (firstCookie.sprite.position.y + lastCookie.sprite.position.y) / 2 - 8;
                var scoreLabel = this.game.add.text(x, y, "" + chain.score, {
                    font: "Gill Sans Bold",
                    fill: "white",
                    align: "center",
                    fontSize: 30
                });
                scoreLabel.z = 300;
                this.game.add.tween(scoreLabel).to({ alpha: 0 }, 700, Phaser.Easing.Linear.None, true);
            };
            GameScene.prototype.shutdown = function () {
                if (this.languageChangeHandler) {
                    window.removeEventListener('candy:languagechange', this.languageChangeHandler);
                    this.languageChangeHandler = null;
                }
            };
            return GameScene;
        }(Phaser.State));
        States.GameScene = GameScene;
    })(States = GameApp.States || (GameApp.States = {}));
})(GameApp || (GameApp = {}));

var GameApp;
(function (GameApp) {
    var States;
    (function (States) {
        'use strict';
        var GameTimer = (function () {
            function GameTimer(game) {
                this.endedAsGameOver = false;
                this.game = game;
            }
            GameTimer.prototype.renderTimer = function () {
                if (this.timer.running) {
                    this.timerText.text = this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000));
                }
                else if (this.endedAsGameOver) {
                    this.timerText.text = GameApp.I18n.t('gameOver');
                }
                else {
                    this.timerText.text = GameApp.I18n.t('done');
                }
            };
            GameTimer.prototype.createTimer = function () {
                this.timerLabel = this.game.add.text(32, 20, GameApp.I18n.t('time'), {
                    font: "Gill Sans Bold, Arial, Microsoft YaHei, PingFang SC, sans-serif",
                    fill: "white",
                    align: "center",
                    fontSize: 20
                });
                this.timerLabel.setShadow(-1, 1, 'rgba(0,0,0,0.5)', 0);
                this.timerText = this.game.add.text(32, 40, "02:00", {
                    font: "Gill Sans Bold, Arial, Microsoft YaHei, PingFang SC, sans-serif",
                    fill: "white",
                    align: "center",
                    fontSize: 30
                });
                this.timerText.setShadow(-1, 1, 'rgba(0,0,0,0.5)', 0);
                this.timer = this.game.time.create();
                this.timerEvent = this.timer.add(Phaser.Timer.MINUTE * 0 + Phaser.Timer.SECOND * 30, this.endTimer, this);
                this.timer.start();
            };
            GameTimer.prototype.endTimer = function () {
                var _this = this;
                this.timer.stop();
                var levelNumber = parseInt(this.game.state.states['GameScene'].levelNumber);
                if (levelNumber <= 2) {
                    levelNumber = levelNumber + 1;
                    var bg = this.game.add.sprite(this.game.world.centerX, -200, 'levelComplete');
                    bg.anchor.setTo(0.5, 0.5);
                    var completeText = this.game.add.text(this.game.world.centerX, -200, GameApp.I18n.t('levelComplete'), {
                        font: "Gill Sans Bold, Arial, Microsoft YaHei, PingFang SC, sans-serif",
                        fill: "white",
                        align: "center",
                        fontSize: 42
                    });
                    completeText.anchor.set(0.5, 0.5);
                    completeText.setShadow(-1, 1, 'rgba(0,0,0,0.5)', 0);
                    var tween = this.game.add.tween(bg).to({ x: this.game.world.centerX, y: this.game.world.centerY }, 3000, Phaser.Easing.Bounce.Out, true);
                    this.game.add.tween(completeText).to({ x: this.game.world.centerX, y: this.game.world.centerY }, 3000, Phaser.Easing.Bounce.Out, true);
                    tween.onComplete.add(function () {
                        _this.changeLevel(levelNumber);
                    }, this);
                }
                else {
                    this.endedAsGameOver = true;
                    this.timerText.text = GameApp.I18n.t('gameOver');
                }
            };
            GameTimer.prototype.updateLabels = function () {
                if (this.timerLabel) {
                    this.timerLabel.text = GameApp.I18n.t('time');
                }
                if (this.timerText && !this.timer.running) {
                    this.timerText.text = this.endedAsGameOver ? GameApp.I18n.t('gameOver') : GameApp.I18n.t('done');
                }
            };
            GameTimer.prototype.changeLevel = function (levelNumber) {
                this.game.state.states['GameScene'].levelNumber = levelNumber;
                this.game.state.states['GameScene'].score = this.game.state.states['GameScene'].score;
                this.game.state.start('GameScene', true, false);
            };
            GameTimer.prototype.formatTime = function (s) {
                var minutes = "0" + Math.floor(s / 60);
                var seconds = "0" + (s - minutes * 60);
                return minutes.substr(-2) + ":" + seconds.substr(-2);
            };
            return GameTimer;
        }());
        States.GameTimer = GameTimer;
    })(States = GameApp.States || (GameApp.States = {}));
})(GameApp || (GameApp = {}));

/// <reference path='../_references.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameApp;
(function (GameApp) {
    var States;
    (function (States) {
        'use strict';
        var GameEnd = (function (_super) {
            __extends(GameEnd, _super);
            function GameEnd() {
                _super.apply(this, arguments);
            }
            GameEnd.prototype.create = function () {
            };
            return GameEnd;
        }(Phaser.State));
        States.GameEnd = GameEnd;
    })(States = GameApp.States || (GameApp.States = {}));
})(GameApp || (GameApp = {}));

/// <reference path='../_references.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameApp;
(function (GameApp) {
    var States;
    (function (States) {
        'use strict';
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu() {
                _super.apply(this, arguments);
            }
            Menu.prototype.preload = function () {
            };
            Menu.prototype.create = function () {
                var Croissant = this.game.add.sprite(32, 100, 'Croissant');
                var Macaroon = this.game.add.sprite(32, 200, 'Macaroon');
                var Cupcake = this.game.add.sprite(32, 300, 'Cupcake');
                var tweens = [];
                var tween1 = this.game.add.tween(Croissant).to({ x: 200 }, 1000, Phaser.Easing.Bounce.Out, false, 1000);
                var tween2 = this.game.add.tween(Macaroon).to({ x: 200 }, 1000, Phaser.Easing.Bounce.Out, true, 200);
                var tween3 = this.game.add.tween(Cupcake).to({ x: 200 }, 1000, Phaser.Easing.Bounce.Out, true, 100);
                tweens.push(tween1, tween2, tween3);
                var firstTween = tweens.shift();
                firstTween.chain.apply(this, tweens);
                firstTween.chain(tween2);
                firstTween.start();
                firstTween.onComplete.add(function () { console.log('complete'); }, this);
                firstTween.onChildComplete.add(function () { console.log('child complete'); }, this);
            };
            Menu.prototype.tweenCroissantComplete = function () {
            };
            return Menu;
        }(Phaser.State));
        States.Menu = Menu;
    })(States = GameApp.States || (GameApp.States = {}));
})(GameApp || (GameApp = {}));

/// <reference path='_references.ts' />
var Boot = GameApp.States.Boot;
var Preloader = GameApp.States.Preloader;
var GameScene = GameApp.States.GameScene;
var GameEnd = GameApp.States.GameEnd;
var Menu = GameApp.States.Menu;
var CandyGame = (function () {
    function CandyGame(scope, injector) {
        GameApp.I18n.createSwitcher();
        this.game = new Phaser.Game(640, 1136, Phaser.AUTO, 'gameCanvas', {
            create: this.create
        });
    }
    CandyGame.prototype.create = function () {
        this.game.state.add("Boot", Boot);
        this.game.state.add("Preloader", Preloader);
        this.game.state.add("Menu", Menu);
        this.game.state.add("GameScene", GameScene);
        this.game.state.add("GameEnd", GameEnd);
        this.game.state.start("Boot");
    };
    return CandyGame;
}());

var GameApp;
(function (GameApp) {
    'use strict';
    var GameHelpers = (function () {
        function GameHelpers() {
        }
        GameHelpers.getRandomNumber = function (maxNumber) {
            return Math.floor((Math.random() * maxNumber) + 1);
        };
        return GameHelpers;
    }());
    GameApp.GameHelpers = GameHelpers;
})(GameApp || (GameApp = {}));

/// <reference path='../../../../typings/angularjs/angular.d.ts' />
/// <reference path='../../libs/phaser/typescript/phaser.d.ts' />
/// <reference path='module.ts' />
/// <reference path='index-controller.ts' />
/// <reference path='i18n.ts' />
/// <reference path='models/chain.ts' />
/// <reference path='models/tile.ts' />
/// <reference path='models/cookie.ts' />
/// <reference path='models/level.ts' />
/// <reference path='models/swap.ts' />
/// <reference path='models/config.ts' />
/// <reference path='states/boot.ts' />
/// <reference path='states/preloader.ts' />
/// <reference path='states/game-scene.ts' />
/// <reference path='states/game-scene.timer.ts' />
/// <reference path='states/game-end.ts' />
/// <reference path='states/menu.ts' />
/// <reference path='candy-game.ts' />
/// <reference path='game-helpers.ts' />

/// <reference path='_references.ts' />
var GameApp;
(function (GameApp) {
    'use strict';
    function GameDirective($injector) {
        var linkFn = function (scope, ele, attrs) {
            //we pass $injector and scope for phaser game so it is possible to communicate with angular app
            new CandyGame(scope, $injector);
        };
        return {
            scope: {},
            template: '<div id="gameCanvas" class="game-shell"></div>',
            link: linkFn
        };
    }
    GameApp.GameDirective = GameDirective;
    GameDirective.$inject = ['$injector'];
    angular.module('GameApp').directive('gameDirective', GameDirective);
})(GameApp || (GameApp = {}));

//# sourceMappingURL=../source-maps/game.js.map
