import { useEffect, useRef } from 'react';
import type { CalculationResults } from '../../../../../lib/types';
import '../../../../../styles/dashboard-macros.css';

interface MacrosSlideProps {
  results: CalculationResults;
  activated: boolean;
}

declare global {
  interface Window {
    togglePanel?: (btn: HTMLElement, panelId: string) => void;
  }
}

const LEGACY_MACROS_HTML = "<div class=\"page-wrapper\">\r\n        <section class=\"section-macros\" id=\"sectionMacros\" aria-label=\"Distribuição de Macronutrientes\">\r\n            <div class=\"glow-cursor\" id=\"glowCursor\" aria-hidden=\"true\"></div>\r\n\r\n            <!-- SVG Gradient Definitions -->\r\n            <svg class=\"svg-defs\" aria-hidden=\"true\">\r\n                <defs>\r\n                    <linearGradient id=\"proteinGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\r\n                        <stop offset=\"0%\" stop-color=\"#10b981\" />\r\n                        <stop offset=\"100%\" stop-color=\"#34d399\" />\r\n                    </linearGradient>\r\n                    <linearGradient id=\"carbGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\r\n                        <stop offset=\"0%\" stop-color=\"#f4a261\" />\r\n                        <stop offset=\"100%\" stop-color=\"#ffbe85\" />\r\n                    </linearGradient>\r\n                    <linearGradient id=\"fatGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\r\n                        <stop offset=\"0%\" stop-color=\"#8b5cf6\" />\r\n                        <stop offset=\"100%\" stop-color=\"#a78bfa\" />\r\n                    </linearGradient>\r\n                </defs>\r\n            </svg>\r\n\r\n            <!-- ============================================= -->\r\n            <!-- SEÇÃO: HEADER ÉPICO                            -->\r\n            <!-- ============================================= -->\r\n            <header class=\"macros-header\">\r\n                <div class=\"macros-header__badge\">\r\n                    🧬 Protocolo Nutricional Ativo\r\n                </div>\r\n                <h2 class=\"macros-header__title\">Distribuição de Macronutrientes</h2>\r\n                <p class=\"macros-header__subtitle\">\r\n                    Suas <strong>3.387 kcal</strong> decompostas em proteína, carboidrato e gordura — cada grama com propósito, cada caloria posicionada.\r\n                </p>\r\n                <div class=\"macros-header__divider\" aria-hidden=\"true\"></div>\r\n            </header>\r\n\r\n            <!-- ============================================= -->\r\n            <!-- SEÇÃO: HERO METRIC — TOTAL CALÓRICO            -->\r\n            <!-- ============================================= -->\r\n            <div class=\"hero-metric\">\r\n                <div class=\"hero-metric__card\">\r\n                    <div class=\"hero-metric__icon-wrap\">🔥</div>\r\n                    <div class=\"hero-metric__content\">\r\n                        <span class=\"hero-metric__label\">Meta Calórica Diária</span>\r\n                        <div class=\"hero-metric__value-row\">\r\n                            <span class=\"hero-metric__value count-up\" data-target=\"3387\" data-suffix=\"\">0</span>\r\n                            <span class=\"hero-metric__unit\">kcal</span>\r\n                        </div>\r\n                        <div class=\"hero-metric__mini-bar\">\r\n                            <div class=\"hero-metric__mini-seg hero-metric__mini-seg--protein\" data-target-w=\"56\"></div>\r\n                            <div class=\"hero-metric__mini-seg hero-metric__mini-seg--carb\" data-target-w=\"178\"></div>\r\n                            <div class=\"hero-metric__mini-seg hero-metric__mini-seg--fat\" data-target-w=\"66\"></div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"hero-metric__status\">✅ Distribuição Validada</div>\r\n                </div>\r\n            </div>\r\n\r\n            <!-- ============================================= -->\r\n            <!-- SEÇÃO: MACRO TRIO — 3 CARDS PRINCIPAIS         -->\r\n            <!-- ============================================= -->\r\n            <div class=\"macro-trio\" role=\"list\" aria-label=\"Detalhes dos macronutrientes\">\r\n\r\n                <!-- ======== PROTEÍNA CARD ======== -->\r\n                <article class=\"macro-card macro-card--protein\" role=\"listitem\">\r\n                    <div class=\"macro-card__accent-line\" aria-hidden=\"true\"></div>\r\n                    <div class=\"macro-card__glow-orb\" aria-hidden=\"true\"></div>\r\n                    <div class=\"macro-card__body\">\r\n                        <!-- Header -->\r\n                        <div class=\"macro-card__header\">\r\n                            <div class=\"macro-card__identity\">\r\n                                <div class=\"macro-card__emoji-wrap\">🥩</div>\r\n                                <div class=\"macro-card__name-group\">\r\n                                    <span class=\"macro-card__name\">Proteína</span>\r\n                                    <span class=\"macro-card__role\">💪 Construção · Recuperação</span>\r\n                                </div>\r\n                            </div>\r\n                            <span class=\"macro-card__pct-badge\">18.7%</span>\r\n                        </div>\r\n\r\n                        <!-- Big number -->\r\n                        <div class=\"macro-card__big-number\">\r\n                            <div class=\"macro-card__value-row\">\r\n                                <span class=\"macro-card__grams-value count-up\" data-target=\"158\" data-suffix=\"g\">0g</span>\r\n                                <span class=\"macro-card__grams-unit\">gramas</span>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Kcal info -->\r\n                        <div class=\"macro-card__kcal-row\">\r\n                            <span class=\"macro-card__kcal-value\">632 kcal</span>\r\n                            <div class=\"macro-card__kcal-divider\"></div>\r\n                            <span class=\"macro-card__kcal-formula\">158g × 4 kcal/g</span>\r\n                            <div class=\"macro-card__kcal-divider\"></div>\r\n                            <span class=\"macro-card__kcal-label\">🔥 18.7% do total</span>\r\n                        </div>\r\n\r\n                        <!-- Ring + Stats -->\r\n                        <div class=\"macro-card__ring-section\">\r\n                            <div class=\"macro-card__ring\">\r\n                                <svg viewBox=\"0 0 80 80\">\r\n                                    <circle class=\"macro-card__ring-bg\" cx=\"40\" cy=\"40\" r=\"36\" />\r\n                                    <circle class=\"macro-card__ring-fill\" cx=\"40\" cy=\"40\" r=\"36\"\r\n                                        stroke=\"url(#proteinGrad)\"\r\n                                        data-target-pct=\"18.7\" />\r\n                                </svg>\r\n                                <div class=\"macro-card__ring-center\">\r\n                                    <span class=\"macro-card__ring-pct count-up\" data-target=\"18.7\" data-suffix=\"%\">0%</span>\r\n                                    <span class=\"macro-card__ring-label\">do total</span>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"macro-card__ring-stats\">\r\n                                <div class=\"macro-card__stat-item\">\r\n                                    <span class=\"macro-card__stat-label\">🔢 Gramas</span>\r\n                                    <span class=\"macro-card__stat-value\">158g</span>\r\n                                </div>\r\n                                <div class=\"macro-card__stat-item\">\r\n                                    <span class=\"macro-card__stat-label\">🔥 Calorias</span>\r\n                                    <span class=\"macro-card__stat-value\">632 kcal</span>\r\n                                </div>\r\n                                <div class=\"macro-card__stat-item\">\r\n                                    <span class=\"macro-card__stat-label\">⚡ Densidade</span>\r\n                                    <span class=\"macro-card__stat-value\">4 kcal/g</span>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Range Gauge -->\r\n                        <div class=\"range-gauge\">\r\n                            <div class=\"range-gauge__header\">\r\n                                <span class=\"range-gauge__title\">📏 Faixa Recomendada</span>\r\n                                <span class=\"range-gauge__status range-gauge__status--low\">⚠️ Próximo ao Mínimo</span>\r\n                            </div>\r\n                            <div class=\"range-gauge__track-wrapper\">\r\n                                <div class=\"range-gauge__track\">\r\n                                    <div class=\"range-gauge__zone-ideal\" style=\"left: 0%; right: 0%;\"></div>\r\n                                    <div class=\"range-gauge__fill\" data-target-width=\"17.8\"></div>\r\n                                    <div class=\"range-gauge__marker\" data-target-left=\"17.8\">\r\n                                        <div class=\"range-gauge__marker-tooltip\">158g</div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"range-gauge__limits\">\r\n                                <span class=\"range-gauge__limit\">\r\n                                    <span class=\"range-gauge__limit-label\">Min</span> 134g\r\n                                </span>\r\n                                <span class=\"range-gauge__limit\">\r\n                                    <span class=\"range-gauge__limit-label\">Max</span> 269g\r\n                                </span>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Toggle -->\r\n                        <button class=\"macro-card__toggle-btn\" aria-expanded=\"false\" onclick=\"togglePanel(this, 'proteinDetails')\">\r\n                            📊 Mais detalhes\r\n                            <span class=\"macro-card__toggle-icon\">\r\n                                <svg viewBox=\"0 0 24 24\"><path d=\"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z\"/></svg>\r\n                            </span>\r\n                        </button>\r\n                    </div>\r\n\r\n                    <!-- Detail panel -->\r\n                    <div class=\"macro-card__details\" id=\"proteinDetails\">\r\n                        <div class=\"macro-card__details-inner\">\r\n                            <div class=\"detail-grid\">\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">🔥 Calorias</span>\r\n                                    <span class=\"detail-cell__value\">632 kcal</span>\r\n                                </div>\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">📊 % do Total</span>\r\n                                    <span class=\"detail-cell__value\">18.7%</span>\r\n                                </div>\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">⚡ Kcal/grama</span>\r\n                                    <span class=\"detail-cell__value\">4 kcal</span>\r\n                                </div>\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">📏 Posição na Faixa</span>\r\n                                    <span class=\"detail-cell__value\">17.8% do range</span>\r\n                                </div>\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">⬇️ Faixa Mínima</span>\r\n                                    <span class=\"detail-cell__value\">134g (536 kcal)</span>\r\n                                </div>\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">⬆️ Faixa Máxima</span>\r\n                                    <span class=\"detail-cell__value\">269g (1.076 kcal)</span>\r\n                                </div>\r\n                                <div class=\"detail-cell detail-cell--highlight\">\r\n                                    <span class=\"detail-cell__label\">✅ Acima do Mínimo</span>\r\n                                    <span class=\"detail-cell__value\">+24g disponíveis</span>\r\n                                </div>\r\n                                <div class=\"detail-cell detail-cell--warn\">\r\n                                    <span class=\"detail-cell__label\">📈 Até o Máximo</span>\r\n                                    <span class=\"detail-cell__value\">−111g restantes</span>\r\n                                </div>\r\n                                <div class=\"detail-cell detail-cell--full\">\r\n                                    <span class=\"detail-cell__label\">💡 Insight</span>\r\n                                    <span class=\"detail-cell__value\" style=\"font-family: var(--font-stack); font-size: 12px; font-weight: 500; color: var(--text-tertiary); line-height: 1.5;\">Sua proteína está próxima ao mínimo recomendado. Se o objetivo é maximizar hipertrofia, considere redistribuir calorias de carboidrato para proteína, visando 2.0g/kg como meta ótima.</span>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </article>\r\n\r\n                <!-- ======== CARBOIDRATO CARD ======== -->\r\n                <article class=\"macro-card macro-card--carb\" role=\"listitem\">\r\n                    <div class=\"macro-card__accent-line\" aria-hidden=\"true\"></div>\r\n                    <div class=\"macro-card__glow-orb\" aria-hidden=\"true\"></div>\r\n                    <div class=\"macro-card__body\">\r\n                        <!-- Header -->\r\n                        <div class=\"macro-card__header\">\r\n                            <div class=\"macro-card__identity\">\r\n                                <div class=\"macro-card__emoji-wrap\">🍚</div>\r\n                                <div class=\"macro-card__name-group\">\r\n                                    <span class=\"macro-card__name\">Carboidrato</span>\r\n                                    <span class=\"macro-card__role\">⚡ Energia · Combustível</span>\r\n                                </div>\r\n                            </div>\r\n                            <span class=\"macro-card__pct-badge\">59.3%</span>\r\n                        </div>\r\n\r\n                        <!-- Big number -->\r\n                        <div class=\"macro-card__big-number\">\r\n                            <div class=\"macro-card__value-row\">\r\n                                <span class=\"macro-card__grams-value count-up\" data-target=\"502\" data-suffix=\"g\">0g</span>\r\n                                <span class=\"macro-card__grams-unit\">gramas</span>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Kcal info -->\r\n                        <div class=\"macro-card__kcal-row\">\r\n                            <span class=\"macro-card__kcal-value\">2.008 kcal</span>\r\n                            <div class=\"macro-card__kcal-divider\"></div>\r\n                            <span class=\"macro-card__kcal-formula\">502g × 4 kcal/g</span>\r\n                            <div class=\"macro-card__kcal-divider\"></div>\r\n                            <span class=\"macro-card__kcal-label\">🔥 59.3% do total</span>\r\n                        </div>\r\n\r\n                        <!-- Ring + Stats -->\r\n                        <div class=\"macro-card__ring-section\">\r\n                            <div class=\"macro-card__ring\">\r\n                                <svg viewBox=\"0 0 80 80\">\r\n                                    <circle class=\"macro-card__ring-bg\" cx=\"40\" cy=\"40\" r=\"36\" />\r\n                                    <circle class=\"macro-card__ring-fill\" cx=\"40\" cy=\"40\" r=\"36\"\r\n                                        stroke=\"url(#carbGrad)\"\r\n                                        data-target-pct=\"59.3\" />\r\n                                </svg>\r\n                                <div class=\"macro-card__ring-center\">\r\n                                    <span class=\"macro-card__ring-pct count-up\" data-target=\"59.3\" data-suffix=\"%\">0%</span>\r\n                                    <span class=\"macro-card__ring-label\">do total</span>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"macro-card__ring-stats\">\r\n                                <div class=\"macro-card__stat-item\">\r\n                                    <span class=\"macro-card__stat-label\">🔢 Gramas</span>\r\n                                    <span class=\"macro-card__stat-value\">502g</span>\r\n                                </div>\r\n                                <div class=\"macro-card__stat-item\">\r\n                                    <span class=\"macro-card__stat-label\">🔥 Calorias</span>\r\n                                    <span class=\"macro-card__stat-value\">2.008 kcal</span>\r\n                                </div>\r\n                                <div class=\"macro-card__stat-item\">\r\n                                    <span class=\"macro-card__stat-label\">⚡ Densidade</span>\r\n                                    <span class=\"macro-card__stat-value\">4 kcal/g</span>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Range Gauge -->\r\n                        <div class=\"range-gauge\">\r\n                            <div class=\"range-gauge__header\">\r\n                                <span class=\"range-gauge__title\">📏 Faixa Recomendada</span>\r\n                                <span class=\"range-gauge__status range-gauge__status--max\">🔶 No Máximo</span>\r\n                            </div>\r\n                            <div class=\"range-gauge__track-wrapper\">\r\n                                <div class=\"range-gauge__track\">\r\n                                    <div class=\"range-gauge__zone-ideal\" style=\"left: 0%; right: 0%;\"></div>\r\n                                    <div class=\"range-gauge__fill\" data-target-width=\"99.5\"></div>\r\n                                    <div class=\"range-gauge__marker\" data-target-left=\"99.5\">\r\n                                        <div class=\"range-gauge__marker-tooltip\">502g</div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"range-gauge__limits\">\r\n                                <span class=\"range-gauge__limit\">\r\n                                    <span class=\"range-gauge__limit-label\">Min</span> 126g\r\n                                </span>\r\n                                <span class=\"range-gauge__limit\">\r\n                                    <span class=\"range-gauge__limit-label\">Max</span> 504g\r\n                                </span>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Toggle -->\r\n                        <button class=\"macro-card__toggle-btn\" aria-expanded=\"false\" onclick=\"togglePanel(this, 'carbDetails')\">\r\n                            📊 Mais detalhes\r\n                            <span class=\"macro-card__toggle-icon\">\r\n                                <svg viewBox=\"0 0 24 24\"><path d=\"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z\"/></svg>\r\n                            </span>\r\n                        </button>\r\n                    </div>\r\n\r\n                    <!-- Detail panel -->\r\n                    <div class=\"macro-card__details\" id=\"carbDetails\">\r\n                        <div class=\"macro-card__details-inner\">\r\n                            <div class=\"detail-grid\">\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">🔥 Calorias</span>\r\n                                    <span class=\"detail-cell__value\">2.008 kcal</span>\r\n                                </div>\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">📊 % do Total</span>\r\n                                    <span class=\"detail-cell__value\">59.3%</span>\r\n                                </div>\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">⚡ Kcal/grama</span>\r\n                                    <span class=\"detail-cell__value\">4 kcal</span>\r\n                                </div>\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">📏 Posição na Faixa</span>\r\n                                    <span class=\"detail-cell__value\">99.5% do range</span>\r\n                                </div>\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">⬇️ Faixa Mínima</span>\r\n                                    <span class=\"detail-cell__value\">126g (504 kcal)</span>\r\n                                </div>\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">⬆️ Faixa Máxima</span>\r\n                                    <span class=\"detail-cell__value\">504g (2.016 kcal)</span>\r\n                                </div>\r\n                                <div class=\"detail-cell detail-cell--highlight\">\r\n                                    <span class=\"detail-cell__label\">✅ Acima do Mínimo</span>\r\n                                    <span class=\"detail-cell__value\">+376g disponíveis</span>\r\n                                </div>\r\n                                <div class=\"detail-cell detail-cell--warn\">\r\n                                    <span class=\"detail-cell__label\">📈 Até o Máximo</span>\r\n                                    <span class=\"detail-cell__value\">−2g restantes</span>\r\n                                </div>\r\n                                <div class=\"detail-cell detail-cell--full\">\r\n                                    <span class=\"detail-cell__label\">💡 Insight</span>\r\n                                    <span class=\"detail-cell__value\" style=\"font-family: var(--font-stack); font-size: 12px; font-weight: 500; color: var(--text-tertiary); line-height: 1.5;\">Carboidratos estão no teto da faixa recomendada, o que é ideal para atletas de alta performance e esportes de endurance. Esse volume de carbs maximiza os estoques de glicogênio muscular e hepático.</span>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </article>\r\n\r\n                <!-- ======== GORDURA CARD ======== -->\r\n                <article class=\"macro-card macro-card--fat\" role=\"listitem\">\r\n                    <div class=\"macro-card__accent-line\" aria-hidden=\"true\"></div>\r\n                    <div class=\"macro-card__glow-orb\" aria-hidden=\"true\"></div>\r\n                    <div class=\"macro-card__body\">\r\n                        <!-- Header -->\r\n                        <div class=\"macro-card__header\">\r\n                            <div class=\"macro-card__identity\">\r\n                                <div class=\"macro-card__emoji-wrap\">🥑</div>\r\n                                <div class=\"macro-card__name-group\">\r\n                                    <span class=\"macro-card__name\">Gordura</span>\r\n                                    <span class=\"macro-card__role\">🧬 Regulação · Equilíbrio</span>\r\n                                </div>\r\n                            </div>\r\n                            <span class=\"macro-card__pct-badge\">22.1%</span>\r\n                        </div>\r\n\r\n                        <!-- Big number -->\r\n                        <div class=\"macro-card__big-number\">\r\n                            <div class=\"macro-card__value-row\">\r\n                                <span class=\"macro-card__grams-value count-up\" data-target=\"83\" data-suffix=\"g\">0g</span>\r\n                                <span class=\"macro-card__grams-unit\">gramas</span>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Kcal info -->\r\n                        <div class=\"macro-card__kcal-row\">\r\n                            <span class=\"macro-card__kcal-value\">747 kcal</span>\r\n                            <div class=\"macro-card__kcal-divider\"></div>\r\n                            <span class=\"macro-card__kcal-formula\">83g × 9 kcal/g</span>\r\n                            <div class=\"macro-card__kcal-divider\"></div>\r\n                            <span class=\"macro-card__kcal-label\">🔥 22.1% do total</span>\r\n                        </div>\r\n\r\n                        <!-- Ring + Stats -->\r\n                        <div class=\"macro-card__ring-section\">\r\n                            <div class=\"macro-card__ring\">\r\n                                <svg viewBox=\"0 0 80 80\">\r\n                                    <circle class=\"macro-card__ring-bg\" cx=\"40\" cy=\"40\" r=\"36\" />\r\n                                    <circle class=\"macro-card__ring-fill\" cx=\"40\" cy=\"40\" r=\"36\"\r\n                                        stroke=\"url(#fatGrad)\"\r\n                                        data-target-pct=\"22.1\" />\r\n                                </svg>\r\n                                <div class=\"macro-card__ring-center\">\r\n                                    <span class=\"macro-card__ring-pct count-up\" data-target=\"22.1\" data-suffix=\"%\">0%</span>\r\n                                    <span class=\"macro-card__ring-label\">do total</span>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"macro-card__ring-stats\">\r\n                                <div class=\"macro-card__stat-item\">\r\n                                    <span class=\"macro-card__stat-label\">🔢 Gramas</span>\r\n                                    <span class=\"macro-card__stat-value\">83g</span>\r\n                                </div>\r\n                                <div class=\"macro-card__stat-item\">\r\n                                    <span class=\"macro-card__stat-label\">🔥 Calorias</span>\r\n                                    <span class=\"macro-card__stat-value\">747 kcal</span>\r\n                                </div>\r\n                                <div class=\"macro-card__stat-item\">\r\n                                    <span class=\"macro-card__stat-label\">⚡ Densidade</span>\r\n                                    <span class=\"macro-card__stat-value\">9 kcal/g</span>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Range Gauge -->\r\n                        <div class=\"range-gauge\">\r\n                            <div class=\"range-gauge__header\">\r\n                                <span class=\"range-gauge__title\">📏 Faixa Recomendada</span>\r\n                                <span class=\"range-gauge__status range-gauge__status--ideal\">✅ Faixa Ideal</span>\r\n                            </div>\r\n                            <div class=\"range-gauge__track-wrapper\">\r\n                                <div class=\"range-gauge__track\">\r\n                                    <div class=\"range-gauge__zone-ideal\" style=\"left: 0%; right: 0%;\"></div>\r\n                                    <div class=\"range-gauge__fill\" data-target-width=\"48.5\"></div>\r\n                                    <div class=\"range-gauge__marker\" data-target-left=\"48.5\">\r\n                                        <div class=\"range-gauge__marker-tooltip\">83g</div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"range-gauge__limits\">\r\n                                <span class=\"range-gauge__limit\">\r\n                                    <span class=\"range-gauge__limit-label\">Min</span> 50g\r\n                                </span>\r\n                                <span class=\"range-gauge__limit\">\r\n                                    <span class=\"range-gauge__limit-label\">Max</span> 118g\r\n                                </span>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Toggle -->\r\n                        <button class=\"macro-card__toggle-btn\" aria-expanded=\"false\" onclick=\"togglePanel(this, 'fatDetails')\">\r\n                            📊 Mais detalhes\r\n                            <span class=\"macro-card__toggle-icon\">\r\n                                <svg viewBox=\"0 0 24 24\"><path d=\"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z\"/></svg>\r\n                            </span>\r\n                        </button>\r\n                    </div>\r\n\r\n                    <!-- Detail panel -->\r\n                    <div class=\"macro-card__details\" id=\"fatDetails\">\r\n                        <div class=\"macro-card__details-inner\">\r\n                            <div class=\"detail-grid\">\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">🔥 Calorias</span>\r\n                                    <span class=\"detail-cell__value\">747 kcal</span>\r\n                                </div>\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">📊 % do Total</span>\r\n                                    <span class=\"detail-cell__value\">22.1%</span>\r\n                                </div>\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">⚡ Kcal/grama</span>\r\n                                    <span class=\"detail-cell__value\">9 kcal</span>\r\n                                </div>\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">📏 Posição na Faixa</span>\r\n                                    <span class=\"detail-cell__value\">48.5% do range</span>\r\n                                </div>\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">⬇️ Faixa Mínima</span>\r\n                                    <span class=\"detail-cell__value\">50g (450 kcal)</span>\r\n                                </div>\r\n                                <div class=\"detail-cell\">\r\n                                    <span class=\"detail-cell__label\">⬆️ Faixa Máxima</span>\r\n                                    <span class=\"detail-cell__value\">118g (1.062 kcal)</span>\r\n                                </div>\r\n                                <div class=\"detail-cell detail-cell--highlight\">\r\n                                    <span class=\"detail-cell__label\">✅ Acima do Mínimo</span>\r\n                                    <span class=\"detail-cell__value\">+33g disponíveis</span>\r\n                                </div>\r\n                                <div class=\"detail-cell detail-cell--highlight\">\r\n                                    <span class=\"detail-cell__label\">📉 Até o Máximo</span>\r\n                                    <span class=\"detail-cell__value\">−35g restantes</span>\r\n                                </div>\r\n                                <div class=\"detail-cell detail-cell--full\">\r\n                                    <span class=\"detail-cell__label\">💡 Insight</span>\r\n                                    <span class=\"detail-cell__value\" style=\"font-family: var(--font-stack); font-size: 12px; font-weight: 500; color: var(--text-tertiary); line-height: 1.5;\">Gordura posicionada perfeitamente no centro da faixa recomendada. Isso garante produção hormonal adequada (testosterona, estrogênio), absorção de vitaminas lipossolúveis (A, D, E, K) e saúde celular.</span>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </article>\r\n            </div>\r\n\r\n            <!-- ============================================= -->\r\n            <!-- SEÇÃO: COMPOSITION RIVER BAR                   -->\r\n            <!-- ============================================= -->\r\n            <div class=\"composition-river\">\r\n                <div class=\"composition-river__header\">\r\n                    <div class=\"composition-river__title\">\r\n                        <span class=\"composition-river__title-emoji\">🧩</span>\r\n                        <span class=\"composition-river__title-text\">Composição Calórica</span>\r\n                    </div>\r\n                    <div class=\"composition-river__total-badge\">\r\n                        <span class=\"composition-river__total-val\">3.387</span>\r\n                        <span class=\"composition-river__total-unit\">kcal/dia</span>\r\n                        <span class=\"composition-river__check\">✅ Validado</span>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"river-bar\" role=\"img\" aria-label=\"Barra de proporção: Proteína 18.7%, Carboidrato 59.3%, Gordura 22.1%\">\r\n                    <div class=\"river-bar__seg river-bar__seg--protein\" data-target-flex=\"18.7\">\r\n                        <div class=\"river-bar__seg-content\">\r\n                            <span class=\"river-bar__seg-emoji\">🥩</span>\r\n                            <div class=\"river-bar__seg-info\">\r\n                                <span class=\"river-bar__seg-name\">Proteína</span>\r\n                                <span class=\"river-bar__seg-pct\">18.7%</span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"river-bar__divider\" aria-hidden=\"true\"></div>\r\n                    <div class=\"river-bar__seg river-bar__seg--carb\" data-target-flex=\"59.3\">\r\n                        <div class=\"river-bar__seg-content\">\r\n                            <span class=\"river-bar__seg-emoji\">🍚</span>\r\n                            <div class=\"river-bar__seg-info\">\r\n                                <span class=\"river-bar__seg-name\">Carboidrato</span>\r\n                                <span class=\"river-bar__seg-pct\">59.3%</span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"river-bar__divider\" aria-hidden=\"true\"></div>\r\n                    <div class=\"river-bar__seg river-bar__seg--fat\" data-target-flex=\"22.1\">\r\n                        <div class=\"river-bar__seg-content\">\r\n                            <span class=\"river-bar__seg-emoji\">🥑</span>\r\n                            <div class=\"river-bar__seg-info\">\r\n                                <span class=\"river-bar__seg-name\">Gordura</span>\r\n                                <span class=\"river-bar__seg-pct\">22.1%</span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"river-legend\">\r\n                    <div class=\"river-legend__item\">\r\n                        <div class=\"river-legend__dot river-legend__dot--protein\" aria-hidden=\"true\"></div>\r\n                        <span class=\"river-legend__text\">🥩 Proteína</span>\r\n                        <span class=\"river-legend__val\">158g</span>\r\n                    </div>\r\n                    <div class=\"river-legend__item\">\r\n                        <div class=\"river-legend__dot river-legend__dot--carb\" aria-hidden=\"true\"></div>\r\n                        <span class=\"river-legend__text\">🍚 Carboidrato</span>\r\n                        <span class=\"river-legend__val\">502g</span>\r\n                    </div>\r\n                    <div class=\"river-legend__item\">\r\n                        <div class=\"river-legend__dot river-legend__dot--fat\" aria-hidden=\"true\"></div>\r\n                        <span class=\"river-legend__text\">🥑 Gordura</span>\r\n                        <span class=\"river-legend__val\">83g</span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <!-- ============================================= -->\r\n            <!-- SEÇÃO: CALORIC CONTRIBUTION BARS               -->\r\n            <!-- ============================================= -->\r\n            <div class=\"contrib-section\">\r\n                <div class=\"contrib-section__header\">\r\n                    <span class=\"contrib-section__title\">📊 Contribuição Calórica</span>\r\n                    <span class=\"contrib-section__subtitle\">Como cada macro contribui para o total de 3.387 kcal</span>\r\n                </div>\r\n\r\n                <div class=\"contrib-row\">\r\n                    <span class=\"contrib-row__emoji\">🥩</span>\r\n                    <span class=\"contrib-row__label\">Proteína</span>\r\n                    <div class=\"contrib-row__bar-wrap\">\r\n                        <div class=\"contrib-row__bar-fill contrib-row__bar-fill--protein\" data-target-width=\"31.5\">\r\n                            <span class=\"contrib-row__bar-text\">158g × 4 kcal/g</span>\r\n                        </div>\r\n                    </div>\r\n                    <span class=\"contrib-row__kcal\">632 <span>kcal</span></span>\r\n                </div>\r\n\r\n                <div class=\"contrib-row\">\r\n                    <span class=\"contrib-row__emoji\">🍚</span>\r\n                    <span class=\"contrib-row__label\">Carboidrato</span>\r\n                    <div class=\"contrib-row__bar-wrap\">\r\n                        <div class=\"contrib-row__bar-fill contrib-row__bar-fill--carb\" data-target-width=\"100\">\r\n                            <span class=\"contrib-row__bar-text\">502g × 4 kcal/g</span>\r\n                        </div>\r\n                    </div>\r\n                    <span class=\"contrib-row__kcal\">2.008 <span>kcal</span></span>\r\n                </div>\r\n\r\n                <div class=\"contrib-row\">\r\n                    <span class=\"contrib-row__emoji\">🥑</span>\r\n                    <span class=\"contrib-row__label\">Gordura</span>\r\n                    <div class=\"contrib-row__bar-wrap\">\r\n                        <div class=\"contrib-row__bar-fill contrib-row__bar-fill--fat\" data-target-width=\"37.2\">\r\n                            <span class=\"contrib-row__bar-text\">83g × 9 kcal/g</span>\r\n                        </div>\r\n                    </div>\r\n                    <span class=\"contrib-row__kcal\">747 <span>kcal</span></span>\r\n                </div>\r\n\r\n                <!-- Density pills -->\r\n                <div class=\"density-pills\">\r\n                    <div class=\"density-pill\">\r\n                        <span class=\"density-pill__emoji\">🥩</span>\r\n                        <span class=\"density-pill__number density-pill__number--protein\">4</span>\r\n                        <span class=\"density-pill__label\">kcal por grama<br>de proteína</span>\r\n                    </div>\r\n                    <div class=\"density-pill\">\r\n                        <span class=\"density-pill__emoji\">🍚</span>\r\n                        <span class=\"density-pill__number density-pill__number--carb\">4</span>\r\n                        <span class=\"density-pill__label\">kcal por grama<br>de carboidrato</span>\r\n                    </div>\r\n                    <div class=\"density-pill\">\r\n                        <span class=\"density-pill__emoji\">🥑</span>\r\n                        <span class=\"density-pill__number density-pill__number--fat\">9</span>\r\n                        <span class=\"density-pill__label\">kcal por grama<br>de gordura</span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <!-- ============================================= -->\r\n            <!-- SEÇÃO: CALORIC PROOF                            -->\r\n            <!-- ============================================= -->\r\n            <div class=\"caloric-proof\">\r\n                <div class=\"caloric-proof__header\">\r\n                    <span style=\"font-size: 16px;\">🧮</span>\r\n                    <span class=\"caloric-proof__header-text\">Validação da Soma Calórica</span>\r\n                </div>\r\n\r\n                <div class=\"caloric-proof__equation\">\r\n                    <div class=\"caloric-proof__term\">\r\n                        <span class=\"caloric-proof__term-emoji\">🥩</span>\r\n                        <div class=\"caloric-proof__term-info\">\r\n                            <span class=\"caloric-proof__term-name\">Proteína</span>\r\n                            <span class=\"caloric-proof__term-val\">632</span>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <span class=\"caloric-proof__op\">+</span>\r\n\r\n                    <div class=\"caloric-proof__term\">\r\n                        <span class=\"caloric-proof__term-emoji\">🍚</span>\r\n                        <div class=\"caloric-proof__term-info\">\r\n                            <span class=\"caloric-proof__term-name\">Carboidrato</span>\r\n                            <span class=\"caloric-proof__term-val\">2.008</span>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <span class=\"caloric-proof__op\">+</span>\r\n\r\n                    <div class=\"caloric-proof__term\">\r\n                        <span class=\"caloric-proof__term-emoji\">🥑</span>\r\n                        <div class=\"caloric-proof__term-info\">\r\n                            <span class=\"caloric-proof__term-name\">Gordura</span>\r\n                            <span class=\"caloric-proof__term-val\">747</span>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <span class=\"caloric-proof__op\">=</span>\r\n\r\n                    <div class=\"caloric-proof__result\">\r\n                        <span class=\"caloric-proof__result-emoji\">✅</span>\r\n                        <span class=\"caloric-proof__result-value count-up\" data-target=\"3387\" data-suffix=\"\">0</span>\r\n                        <span class=\"caloric-proof__result-label\">kcal</span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <!-- ============================================= -->\r\n            <!-- SEÇÃO: INSIGHTS BAR — BOTTOM INFO              -->\r\n            <!-- ============================================= -->\r\n            <div class=\"insights-bar\">\r\n                <div class=\"insight-card insight-card--protein\">\r\n                    <span class=\"insight-card__emoji\">🥩</span>\r\n                    <span class=\"insight-card__value\">158g</span>\r\n                    <span class=\"insight-card__label\">Proteína Diária</span>\r\n                    <span class=\"insight-card__sub\">632 kcal · 18.7%</span>\r\n                </div>\r\n                <div class=\"insight-card insight-card--carb\">\r\n                    <span class=\"insight-card__emoji\">🍚</span>\r\n                    <span class=\"insight-card__value\">502g</span>\r\n                    <span class=\"insight-card__label\">Carboidrato Diário</span>\r\n                    <span class=\"insight-card__sub\">2.008 kcal · 59.3%</span>\r\n                </div>\r\n                <div class=\"insight-card insight-card--fat\">\r\n                    <span class=\"insight-card__emoji\">🥑</span>\r\n                    <span class=\"insight-card__value\">83g</span>\r\n                    <span class=\"insight-card__label\">Gordura Diária</span>\r\n                    <span class=\"insight-card__sub\">747 kcal · 22.1%</span>\r\n                </div>\r\n                <div class=\"insight-card insight-card--total\">\r\n                    <span class=\"insight-card__emoji\">🎯</span>\r\n                    <span class=\"insight-card__value\">743g</span>\r\n                    <span class=\"insight-card__label\">Total de Macros</span>\r\n                    <span class=\"insight-card__sub\">3.387 kcal · 100%</span>\r\n                </div>\r\n            </div>\r\n\r\n        </section>\r\n    </div>";

export const MacrosSlide = ({ results: _results, activated: _activated }: MacrosSlideProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const sectionMacros = root.querySelector<HTMLElement>('#sectionMacros');
    const glowCursor = root.querySelector<HTMLElement>('#glowCursor');

    if (!sectionMacros) {
      return;
    }

    let hasAnimated = false;
    let rafId = 0;
    const timeouts: number[] = [];
    let observer: IntersectionObserver | null = null;

    const schedule = (fn: () => void, delay: number) => {
      const id = window.setTimeout(fn, delay);
      timeouts.push(id);
    };

    const animateRings = () => {
      try {
        const fills = root.querySelectorAll<SVGCircleElement>('.macro-card__ring-fill');
        fills.forEach((fill, index) => {
          const r = Number.parseFloat(fill.getAttribute('r') ?? '36') || 36;
          const circumference = 2 * Math.PI * r;
          fill.style.strokeDasharray = circumference.toString();
          fill.style.strokeDashoffset = circumference.toString();

          const pct = Number.parseFloat(fill.getAttribute('data-target-pct') ?? '0') || 0;
          const offset = circumference - (circumference * pct) / 100;

          schedule(() => {
            fill.style.strokeDashoffset = offset.toString();
          }, 400 + index * 200);
        });
      } catch (error) {
        console.error('Ring animation error:', error);
      }
    };

    const animateRangeGauges = () => {
      try {
        const fills = root.querySelectorAll<HTMLElement>('.range-gauge__fill');
        const markers = root.querySelectorAll<HTMLElement>('.range-gauge__marker');

        fills.forEach((fill) => {
          const width = fill.getAttribute('data-target-width');
          if (width) {
            fill.style.width = width + '%';
          }
        });

        markers.forEach((marker) => {
          const left = marker.getAttribute('data-target-left');
          if (left) {
            marker.style.left = left + '%';
          }
        });
      } catch (error) {
        console.error('Range gauge animation error:', error);
      }
    };

    const animateRiverBar = () => {
      try {
        const segments = root.querySelectorAll<HTMLElement>('.river-bar__seg');
        segments.forEach((seg, index) => {
          const targetFlex = seg.getAttribute('data-target-flex');
          if (!targetFlex) {
            return;
          }

          schedule(() => {
            seg.style.flex = '0 0 ' + targetFlex + '%';
            const content = seg.querySelector<HTMLElement>('.river-bar__seg-content');
            if (content) {
              schedule(() => {
                content.style.opacity = '1';
              }, 600);
            }
          }, index * 150);
        });
      } catch (error) {
        console.error('River bar animation error:', error);
      }
    };

    const animateContribBars = () => {
      try {
        const bars = root.querySelectorAll<HTMLElement>('.contrib-row__bar-fill');
        bars.forEach((bar, index) => {
          const width = bar.getAttribute('data-target-width');
          if (!width) {
            return;
          }

          schedule(() => {
            bar.style.width = width + '%';
          }, index * 200);
        });
      } catch (error) {
        console.error('Contribution bar animation error:', error);
      }
    };

    const animateMiniBar = () => {
      try {
        const segs = root.querySelectorAll<HTMLElement>('.hero-metric__mini-seg');
        segs.forEach((seg) => {
          const width = seg.getAttribute('data-target-w');
          if (!width) {
            return;
          }

          schedule(() => {
            seg.style.width = width + 'px';
          }, 800);
        });
      } catch (error) {
        console.error('Mini bar animation error:', error);
      }
    };

    const animateCountUps = () => {
      try {
        const els = root.querySelectorAll<HTMLElement>('.count-up');
        els.forEach((el, index) => {
          const target = Number.parseFloat(el.getAttribute('data-target') ?? '0') || 0;
          const suffix = el.getAttribute('data-suffix') ?? '';
          const isDecimal = target % 1 !== 0;
          const duration = 1400;
          let startTime: number | null = null;
          const delay = 400 + index * 80;

          schedule(() => {
            const step = (timestamp: number) => {
              if (!startTime) {
                startTime = timestamp;
              }

              const progress = Math.min((timestamp - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 4);
              const current = eased * target;

              if (isDecimal) {
                el.textContent = current.toFixed(1) + suffix;
              } else {
                el.textContent = Math.round(current).toLocaleString('pt-BR') + suffix;
              }

              if (progress < 1) {
                window.requestAnimationFrame(step);
                return;
              }

              if (isDecimal) {
                el.textContent = target.toFixed(1) + suffix;
              } else {
                el.textContent = Math.round(target).toLocaleString('pt-BR') + suffix;
              }
            };

            window.requestAnimationFrame(step);
          }, delay);
        });
      } catch (error) {
        console.error('Count-up animation error:', error);
      }
    };

    const animateOnView = () => {
      if (hasAnimated) {
        return;
      }

      hasAnimated = true;
      animateRings();
      animateCountUps();
      animateMiniBar();

      schedule(() => {
        animateRangeGauges();
      }, 500);

      schedule(() => {
        animateRiverBar();
      }, 700);

      schedule(() => {
        animateContribBars();
      }, 1000);
    };

    const previousTogglePanel = window.togglePanel;

    const togglePanel = (btn: HTMLElement, panelId: string) => {
      try {
        const panel = root.querySelector<HTMLElement>('#' + panelId);
        if (!panel) {
          return;
        }

        const isOpen = panel.classList.contains('is-open');
        const textNode = Array.from(btn.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);

        if (isOpen) {
          panel.classList.remove('is-open');
          btn.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
          if (textNode) {
            textNode.textContent = '\u{1F4CA} Mais detalhes ';
          }
          return;
        }

        panel.classList.add('is-open');
        btn.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        if (textNode) {
          textNode.textContent = '\u{1F4CA} Menos detalhes ';
        }
      } catch (error) {
        console.error('Toggle panel error:', error);
      }
    };

    window.togglePanel = togglePanel;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateOnView();
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 },
      );

      observer.observe(sectionMacros);
    } else {
      schedule(animateOnView, 300);
    }

    const onMouseMove = (event: MouseEvent) => {
      if (!glowCursor || rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        const rect = sectionMacros.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        glowCursor.style.left = x + 'px';
        glowCursor.style.top = y + 'px';
        rafId = 0;
      });
    };

    if (glowCursor) {
      sectionMacros.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      if (glowCursor) {
        sectionMacros.removeEventListener('mousemove', onMouseMove);
      }

      if (observer) {
        observer.disconnect();
      }

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }

      timeouts.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });

      if (window.togglePanel === togglePanel) {
        if (previousTogglePanel) {
          window.togglePanel = previousTogglePanel;
        } else {
          delete window.togglePanel;
        }
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      id="dfp-heading-macros"
      className="macros-section-legacy"
      aria-label={'Distribui\u00E7\u00E3o de Macronutrientes'}
    >
      <div dangerouslySetInnerHTML={{ __html: LEGACY_MACROS_HTML }} />
    </div>
  );
};
