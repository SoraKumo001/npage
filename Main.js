(function(){

//最初に実行するファンクションを設定
document.addEventListener("DOMContentLoaded",onLoad);


//ページが読み込まれた際に最初に呼び出される
function onLoad(){
	//--------------------------------------------
	//ページタイトルと経過時間表示場所の作成
	var header = document.createElement("div");
	document.body.appendChild(header);
	header.innerHTML = "<span>ページ遷移しないプログラム 経過時間:</span><span>0</span>";
	//ページが遷移していないことを確認するため、経過時間を表示
	var t = header.querySelector("span:nth-child(2)");
	setInterval(function(){t.textContent=parseInt(t.textContent)+1},1000);

	//--------------------------------------------
	//ページ切り替えボタンの作成
	var menu = document.createElement("div");
	document.body.appendChild(menu);
	menu.innerHTML = "<button>ページ0</button><button>ページ1</button><button>ページ2</button>";
	var buttons = menu.querySelectorAll("button");
	buttons.forEach(function(v,i){v.addEventListener("click",function(){changePage(i,true)})})

	//--------------------------------------------
	//メインメッセージ表示領域の作成
	var main = document.createElement("div");
	document.body.appendChild(main);

	//--------------------------------------------
	//URLのパラメータ部分から、表示ページを切り替え
	function goLocation(){
		//パラメータの読み出し
		var p = {};
	    location.search.substring(1).split('&').forEach(function(v){s=v.split('=');p[s[0]]=s[1];});
		//指定ページに飛ぶ
		changePage(p['p']>=0?p['p']:0,false);
	}

	//--------------------------------------------
	//ページ切り替えとブラウザの履歴管理
	function changePage(page,flag){
		//flagがtrueなら、ページの状態を履歴に保存
		if(flag)
			history.pushState(null,null,"?p="+page);
		//ページ内容を書き換え
		main.innerHTML = ["あいうえお","かきくけこ","さしすせそ"][page];
	}

	//ブラウザの「戻る」「進む」ボタンが押された場合のイベント処理
	addEventListener('popstate', function(){goLocation();}, false);
	//初期ページへ飛ぶ
	goLocation();
}

})();