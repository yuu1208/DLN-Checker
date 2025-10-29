document.addEventListener('input', function() {

    // デバッグモード（変数値を全て出力する）
    // 0=無効, 1=有効
    var debug = 1;

    //FORMから番号を取得
    var number = document.getElementById("input_id").value;

    const PrefCode = {
        10: "北海道", 11: "北海道 函館", 12: "北海道 旭川", 13: "北海道 釧路", 14: "北海道 北見", 20: "青森県", 21: "岩手県", 22: "宮城県", 23: "秋田県", 24: "山形県", 25: "福島県", 30: "東京都", 40: "茨城県", 41: "栃木県", 42: "群馬県", 43: "埼玉県", 44: "千葉県", 45: "神奈川県", 46: "新潟県", 47: "山梨県", 48: "長野県", 49: "静岡県", 50: "富山県", 51: "石川県", 52: "福井県", 53: "岐阜県", 54: "愛知県", 55: "三重県", 60: "滋賀県", 61: "京都府", 62: "大阪府", 63: "兵庫県", 64: "奈良県", 65: "和歌山県", 70: "鳥取県", 71: "島根県", 72: "岡山県", 73: "広島県", 74: "山口県", 80: "徳島県", 81: "香川県", 82: "愛媛県", 83: "高知県", 90: "福岡県", 91: "佐賀県", 92: "長崎県", 93: "熊本県", 94: "大分県", 95: "宮崎県", 96: "鹿児島県", 97: "沖縄県"
    }

    //都道府県コードは12桁中の最初の2桁、西暦コードは最初の3桁から4桁、内部コードは5~11、紛失回数コードは最後の番号	
    var lc_code = number.substr(0,2); //0桁から2文字
    var yr_code = number.substr(2,2);
    var naibu = number.substr(4,7);
    var lost = number.substr(11,1);

    //初期値設定
    var year = "";
    var lost_text = "";
    var location = PrefCode[lc_code];

    //hanteiのIDを持ったspanにデータを入れる
    var result = document.getElementById('hantei'); 

    //西暦判定
    const date = new Date();
    const y = date.getFullYear();

    //現在の西暦より免許取得年が小さいか
    if(("20"+yr_code) <= y) {year = "20"+yr_code;}
    else {year = "19"+yr_code;}
    
    //紛失回数に応じてコメントが変わる
    if(lost <= 2) {
        switch(lost) {
        case '0':
            lost_text = "素晴らしい！";
            break;
        case '1':
            lost_text = "ん？";
            break;
        case '2':
            lost_text = "ん？？";
            break;
        }
    }
    //3回以上？
    else {
        lost_text = "なくしすぎ！";
    }

    document.getElementById('plate').style.display = "block";

    //結果をhtmlに出力
    result.innerHTML = "あなたは<b>" + year + "年</b>、<b>" + location + "</b>で免許を取得したみたいですね。<br>再発行回数は<b>" + lost + "回</b>。" + lost_text;

    if( !lost || !lc_code || !year || !location) {result.innerHTML = "<span style='color:red;font-weight:bold'>入力が正しく行われていません！</span>";}
    if(number.length < 12) {result.innerHTML = "<span style='color:red;font-weight:bold'>桁が足りません（12桁）</span>";} 

    //デバッグモードの場合は下記の情報も出力
    if(debug == 1) {
        //debugのHTMLを対象
        var debug_mode = document.getElementById('debug');

        //debugのIDを持ったspanにデータを入れる
        debug_mode.innerHTML = "<b>第 " + number + " 号</b><br>都道府県番号：" + lc_code + "（" + location + "）" + "<br>取得時の西暦：" + yr_code + "（" + year + "）"+ "<br>公安管理番号：" + naibu + "<br>　再発行回数：" + lost + "";
    }
})