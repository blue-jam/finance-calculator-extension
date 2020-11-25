# ファイナンス計算機

![build](https://github.com/blue-jam/finance-calculator-extension/workflows/Test%20and%20Build/badge.svg)

投資生活をサポートするための Google Chrome 拡張。

## 使い方

1. SBI 証券の Web ページにログインします。
1. SBI 証券の国内株式の情報のページに行きます。([例](https://site3.sbisec.co.jp/ETGate/?_ControlID=WPLETsiR001Control&_DataStoreID=DSWPLETsiR001Control&_PageID=WPLETsiR001Idtl10&_ActionID=stockDetail&getFlg=on&stock_sec_code_mul=9020&exchange_code=JPN&i_dom_flg=1&i_exchange_code=JPN&i_stock_sec=9020&i_output_type=0&int_ds=dstock%3Ahistory%3Aissueinfo_price%3Aprice))
1. 企業の株価が表示されている欄の右側に、株の公正価格を計算した結果が表示されます。公正価格の下のフォームで、公正価格の計算に用いている
   β 値を変更することができます。

### 設定の変更

1. [Google Chrome の拡張機能のページ](chrome://extensions)にアクセスします。
1. ファイナンス計算機の項目にある、詳細をクリックします。
1. "拡張機能のオプション"をクリックします。
1. 新しく開いた、ファイナンス計算機の設定ページで、TOPIX の期待収益率と、日本国債の金利を変更します。
1. 他のタブで SBI 証券のページを開いている場合は、設定の変更を反映するためにページを更新してください。
