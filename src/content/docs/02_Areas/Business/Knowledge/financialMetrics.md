---
title: Financial Metrics
desc: This is detailed guide on financial metrics
---

Below is the **complete metric list + formulas** required to implement **Engine A — Financial Strength Core** exactly as defined in your architecture.

Metrics are grouped exactly by the **engine layers**, and every **derived metric includes the formula**.

Raw inputs do not need formulas because they come directly from filings.

---

---

# 1️⃣ Raw Financial Statement Inputs

These are **directly ingested** from filings.

### Income Statement

* Total Revenue
* Revenue (TTM)
* Revenue (Historical Series ≥ 5 years)
* Cost of Goods Sold (COGS)
* Gross Profit
* Operating Expenses
* R&D Expense
* SG&A Expense
* Operating Income (EBIT)
* EBITDA
* Net Income
* EPS Basic
* EPS Diluted
* Shares Outstanding Basic
* Shares Outstanding Diluted
* Interest Expense
* Tax Expense
* Depreciation
* Amortization

---

### Balance Sheet

* Total Assets
* Total Current Assets
* Cash & Cash Equivalents
* Short-Term Investments
* Inventory
* Accounts Receivable
* Goodwill
* Intangible Assets
* Total Liabilities
* Current Liabilities
* Long-Term Debt
* Short-Term Debt
* Shareholder Equity
* Retained Earnings

---

### Cash Flow Statement

* Operating Cash Flow (CFO)
* Capital Expenditures (CapEx)
* Free Cash Flow (if reported)
* Stock-Based Compensation
* Debt Issuance
* Debt Repayment
* Share Repurchases
* Dividends Paid

---

# 2️⃣ Growth & Durability Metrics

---

### 1-Year Revenue Growth

[
RevenueGrowth_{1Y} =
\frac{Revenue_{t} - Revenue_{t-1}}{Revenue_{t-1}}
]

---

### 3-Year Revenue CAGR

[
RevenueCAGR_{3Y} =
\left(\frac{Revenue_{t}}{Revenue_{t-3}}\right)^{1/3} - 1
]

---

### 5-Year Revenue CAGR

[
RevenueCAGR_{5Y} =
\left(\frac{Revenue_{t}}{Revenue_{t-5}}\right)^{1/5} - 1
]

---

### Revenue Volatility

[
RevenueVolatility =
StdDev(\text{YoY Revenue Growth})
]

---

### Revenue Acceleration

[
RevenueAcceleration =
RevenueGrowth_{t} - RevenueGrowth_{t-1}
]

---

### 1-Year EPS Growth

[
EPSGrowth_{1Y} =
\frac{EPS_t - EPS_{t-1}}{EPS_{t-1}}
]

---

### 3-Year EPS CAGR

[
EPSCAGR_{3Y} =
\left(\frac{EPS_t}{EPS_{t-3}}\right)^{1/3} - 1
]

---

### 5-Year EPS CAGR

[
EPSCAGR_{5Y} =
\left(\frac{EPS_t}{EPS_{t-5}}\right)^{1/5} - 1
]

---

### EPS Volatility

[
EPSVolatility =
StdDev(\text{Quarterly EPS})
]

---

### Earnings Surprise

[
EarningsSurprise =
\frac{ActualEPS - EstimatedEPS}{|EstimatedEPS|}
]

---

### Earnings Beat Rate

[
BeatRate =
\frac{QuartersBeatingEstimates}{TotalQuarters}
]

---

# 3️⃣ Capital Efficiency Metrics

---

### Invested Capital

[
InvestedCapital =
TotalDebt + ShareholderEquity - Cash
]

---

### ROIC

[
ROIC =
\frac{NOPAT}{InvestedCapital}
]

Where

[
NOPAT = EBIT \times (1 - TaxRate)
]

---

### ROIC 3-Year Average

[
ROIC_{avg} =
\frac{ROIC_{t} + ROIC_{t-1} + ROIC_{t-2}}{3}
]

---

### ROIC Stability

[
ROICStability =
1 - StdDev(ROIC_{5yr})
]

---

### ROE

[
ROE =
\frac{NetIncome}{ShareholderEquity}
]

---

### ROA

[
ROA =
\frac{NetIncome}{TotalAssets}
]

---

### Incremental ROIC

[
IncrementalROIC =
\frac{\Delta NOPAT}{\Delta InvestedCapital}
]

---

### Asset Turnover

[
AssetTurnover =
\frac{Revenue}{TotalAssets}
]

---

### Invested Capital Turnover

[
IC_Turnover =
\frac{Revenue}{InvestedCapital}
]

---

### FCF to Invested Capital

[
FCFtoIC =
\frac{FreeCashFlow}{InvestedCapital}
]

---

# 4️⃣ Margin Strength Metrics

---

### Gross Margin

[
GrossMargin =
\frac{Revenue - COGS}{Revenue}
]

---

### Gross Margin Trend

Slope from linear regression:

[
GrossMarginTrend =
Slope(GrossMargin_{5yr})
]

---

### Operating Margin

[
OperatingMargin =
\frac{OperatingIncome}{Revenue}
]

---

### Operating Margin Expansion

[
OperatingMarginExpansion =
OperatingMargin_t - OperatingMargin_{t-3}
]

---

### Net Margin

[
NetMargin =
\frac{NetIncome}{Revenue}
]

---

### EBITDA Margin

[
EBITDAMargin =
\frac{EBITDA}{Revenue}
]

---

### Margin Stability

[
MarginStability =
1 - StdDev(OperatingMargin_{5yr})
]

---

# 5️⃣ Cash Flow Quality

---

### Free Cash Flow

[
FCF =
OperatingCashFlow - CapEx
]

---

### FCF Margin

[
FCFMargin =
\frac{FCF}{Revenue}
]

---

### FCF Growth Rate

[
FCFGrowth =
\frac{FCF_t - FCF_{t-1}}{FCF_{t-1}}
]

---

### FCF Conversion

[
FCFConversion =
\frac{FCF}{NetIncome}
]

---

### Operating Cash Flow Consistency

[
CFOConsistency =
\frac{PositiveCFOYears}{TotalYears}
]

---

### Accrual Ratio

[
AccrualRatio =
\frac{NetIncome - CFO}{TotalAssets}
]

---

### CapEx Intensity

[
CapExIntensity =
\frac{CapEx}{Revenue}
]

---

# 6️⃣ Balance Sheet Strength

---

### Current Ratio

[
CurrentRatio =
\frac{CurrentAssets}{CurrentLiabilities}
]

---

### Quick Ratio

[
QuickRatio =
\frac{Cash + ShortTermInvestments + Receivables}{CurrentLiabilities}
]

---

### Cash Ratio

[
CashRatio =
\frac{Cash + ShortTermInvestments}{CurrentLiabilities}
]

---

### Debt-to-Equity

[
DebtEquity =
\frac{TotalDebt}{ShareholderEquity}
]

---

### Net Debt

[
NetDebt =
TotalDebt - Cash
]

---

### Net Debt / EBITDA

[
NetDebtEBITDA =
\frac{NetDebt}{EBITDA}
]

---

### Interest Coverage

[
InterestCoverage =
\frac{EBIT}{InterestExpense}
]

---

### Debt Growth

[
DebtGrowth =
\frac{Debt_t - Debt_{t-1}}{Debt_{t-1}}
]

---

### Retained Earnings Ratio

[
RetainedEarningsAssets =
\frac{RetainedEarnings}{TotalAssets}
]

---

# 7️⃣ Bankruptcy & Quality Scores

---

### Altman Z-Score

[
Z =
1.2\frac{WC}{TA}
+
1.4\frac{RE}{TA}
+
3.3\frac{EBIT}{TA}
+
0.6\frac{MVE}{TL}
+
1.0\frac{Sales}{TA}
]

---

### Piotroski F-Score

Score based on **9 binary conditions**:

1. Positive Net Income
2. Positive CFO
3. ROA increasing
4. CFO > Net Income
5. Lower leverage
6. Higher current ratio
7. No new shares issued
8. Higher gross margin
9. Higher asset turnover

---

# 8️⃣ Valuation Discipline

---

### Price-to-Earnings

[
PE =
\frac{Price}{EPS}
]

---

### PEG Ratio

[
PEG =
\frac{PE}{EPSGrowth}
]

---

### EV (Enterprise Value)

[
EV =
MarketCap + Debt - Cash
]

---

### EV / EBITDA

[
EVEBITDA =
\frac{EV}{EBITDA}
]

---

### EV / FCF

[
EVFCF =
\frac{EV}{FCF}
]

---

### Price-to-Sales

[
PS =
\frac{MarketCap}{Revenue}
]

---

### Price-to-Book

[
PB =
\frac{MarketCap}{ShareholderEquity}
]

---

### FCF Yield

[
FCFYield =
\frac{FCF}{MarketCap}
]

---

### Earnings Yield

[
EarningsYield =
\frac{EPS}{Price}
]

---

### Historical Valuation Z-score

[
ValuationZ =
\frac{CurrentMultiple - MeanMultiple}{StdDevMultiple}
]

---

# 9️⃣ Risk Controls

---

### Earnings Volatility

[
EarningsVolatility =
StdDev(EPS)
]

---

### Share Dilution Rate

[
DilutionRate =
\frac{Shares_t - Shares_{t-1}}{Shares_{t-1}}
]

---

### SBC Ratio

[
SBCRatio =
\frac{StockCompensation}{Revenue}
]

---

### Goodwill Ratio

[
GoodwillRatio =
\frac{Goodwill}{TotalAssets}
]

---

### Beta

Regression:

[
Beta =
Covariance(R_{stock},R_{market}) / Variance(R_{market})
]

---

### Maximum Drawdown

[
MaxDrawdown =
\frac{PeakPrice - TroughPrice}{PeakPrice}
]

---

# 🔟 Stability Metrics

---

### Profitability Streak

Number of consecutive years:

[
NetIncome > 0
]

---

### Positive FCF Streak

[
Years(FCF > 0)
]

---

### Dividend Sustainability

[
DividendCoverage =
\frac{FCF}{Dividends}
]

---

### Buyback Effectiveness

[
BuybackEffectiveness =
\frac{ShareReduction}{BuybackSpend}
]

---

# 1️⃣1️⃣ Sector Normalization Metrics

---

### Sector Relative Score

[
RelativeScore =
\frac{Metric - SectorMedian}{SectorStdDev}
]

---

### Percentile Rank

[
Percentile =
Rank(Metric) / TotalCompanies
]

---

# 1️⃣2️⃣ Final Financial Strength Score

Weighted sum:

[
Score =
0.20(Growth)
+
0.20(Efficiency)
+
0.15(Margins)
+
0.15(CashFlow)
+
0.15(BalanceSheet)
+
0.10(Valuation)
+
0.05(Risk)
]

Normalized to:

[
0 - 100
]

---

# TOTAL METRICS IN ENGINE A

Approximate totals:

| Category           | Count |
| ------------------ | ----- |
| Raw Inputs         | ~45   |
| Growth Metrics     | ~10   |
| Efficiency Metrics | ~10   |
| Margins            | ~7    |
| Cash Flow          | ~7    |
| Balance Sheet      | ~10   |
| Valuation          | ~10   |
| Risk               | ~7    |
| Stability          | ~4    |
| Normalization      | ~3    |

**Total: ~110–125 metrics**

---

