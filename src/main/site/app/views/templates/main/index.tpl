
<div ng-app="app">
    <header class="p-header u-flex" id="header" ng-controller="HeaderCtrl as header">
        <div class="u-p95">
            ヒューライツ大阪名簿データベース
        </div>
        <!-- ボタン -->
        <gmenu class="p-header-buttons u-p5">
        </gmenu>
    </header>
    <main>
<!--    <div id="main" ng-controller="MainCtrl as main"> -->
        <!-- タブ -->
        <div class="p-tabs u-flex">
            <div class="p-tab search u-center is-active">名簿一覧</div>
            <div class="p-tab clip   u-center">選択 ({{ main.selectedNum }})</div>
        </div>

        <!-- 本検索フォーム -->
        <div id="main-list">
            <div class="p-main-list-line">
            </div>
            <!-- リスト -->
            <names-list-form class="p-search">
                <div id="names-list-left" class="u-flex">
                    <div class="p-search-condition">
                        <form ng-submit="namesList.search()" style="height:100%">
                            <div class="p-search-condition-box">
                                <h3>フリーワード</h3>
                                <input type="search" class="u-p100" ng-model="namesList.query.freeword" />
                            </div>
                            <div class="p-search-condition-box">
                                <h3>氏名 / 組織名</h3>
                                <input type="search" class="u-p100" ng-model="namesList.query.name" />
                            </div>
                            <span class="u-vert-sep"></span>
                            <div class="p-search-condition-box">
                                <h3 class="p-search-condition-label">役員・会員・ひろば発送</h3>
                                <div>
                                    <label ng-repeat="type in main.memberTypes">
                                        <input type="checkbox" checklist-model="namesList.query.cd_membertype" checklist-value="type.value" />{{ type.name }}
                                    </label>
                                </div>
                            </div>
                            <span class="u-vert-sep"></span>
                            <div class="p-search-condition-box">
                                <h3 class="p-search-condition-label">配布期限</h3>
                                <input type="search" class="ui-date" pattern="^\d{1,4}/\d{1,2}/\d{1,2}$" ng-model="namesList.query.send_expire_from" />
                                ～
                                <input type="search" class="ui-date" pattern="^\d{1,4}/\d{1,2}/\d{1,2}$" ng-model="namesList.query.send_expire_to" />
                            </div>
                            <span class="u-vert-sep"></span>
                            <div class="p-search-condition-box u-right u-text-m">
                                <a href="#" class="p-search-condition-clear" ng-click="namesList.resetQuery()">検索条件をクリア</a>
                            </div>
                            <div class="p-search-condition-box u-center">
                                <button type="submit" class="u-p70">検索</button>
                            </div>
                        </form>
                    </div>
                    <!--  -->
                    <names-list class="u-p80">
                        <div>
                            <div class="p-commands">
                                <div class="p-command">
                                    <button type="button" ng-click="addNameDialog.open()">新しい連絡先を登録</button>
                                </div>
                            </div>
                            <div class="p-list u-block">
                                <!-- ページング -->
                                <div class="p-list-head u-flex">
                                    <div class="p-pagecnt u-15 u-text-m">
                                        {{namesList.total}} 件中 {{namesList.idxfrom}}-{{namesList.idxto}}件
                                    </div>
                                    <div class="p-paging u-p45 u-text-l">
                                        <a href="#" class="p-paging-left">前の20件</a>
                                        <a href="#" class="p-paging-right">次の20件</a>
                                        <span class="u-hori-sep"></span>
                                        <a href="#" class="p-page">1</a>
                                        <a href="#" class="p-page is-active">2</a>
                                        <a href="#" class="p-page">3</a>
                                        <a href="#" class="p-page">4</a>
                                    </div>
                                    <div class="u-text-s u-p40 u-right">
                                        <button type="button">住所ラベル</button>
                                        <button type="button">CSV</button>
                                    </div>
                                </div>

                                <div>
                                    <button type="button" class="size-s">検索結果をすべて選択</button>
                                    <button type="button" class="size-s">すべての選択を取り消す</button>
                                </div>
                                <!-- リスト -->
                                <div class="p-names-list">
                                    <div class="p-names-row p-names-header u-flex">
                                        <div class="p-names-clip">選択</div>
                                        <div class="p-names-mem">会員</div>
                                        <div class="p-names-name">氏名/組織名</div>
                                        <div class="p-names-expr">配布期限</div>
                                        <div class="p-names-edit">編集</div>
                                    </div>
                                    <div class="p-names-row u-flex" ng-repeat="name in namesList.datas">
                                        <div class="p-names-clip">
                                            <input type="checkbox" ng-model="name.checked">
                                        </div>
                                        <div class="p-names-mem">{{ name.memberLabel }}</div>
                                        <div class="p-names-name">{{ name.name_e }} / {{ name.name_j }}</div>
                                        <div class="p-names-expr">{{ name.expire_on }}</div>
                                        <div class="p-names-edit">
                                            <button type="button" ng-click="namesList.edit(name.id)">編集</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </names-list>
                </div>
            </names-list-form>
        </div>
        <!-- クリップリスト -->
        <div id="clip-list">
        </div>
        <add-name-dialog ng-model="dialog"></add-name-dialog>
    </main>
</div>