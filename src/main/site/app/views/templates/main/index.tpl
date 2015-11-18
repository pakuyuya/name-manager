
<div ng-app="mainApp">
    <header class="p-header u-flex" id="header" ng-controller="header">
        <div class="u-p95">
            ヒューライツ大阪名簿データベース
        </div>
        <!-- ボタン -->
        <div class="p-header-buttons u-p5" ui-gmenu>
        </div>
    </header>
    <div id="main">
        <!-- タブ -->
        <div class="p-tabs u-flex">
            <div class="p-tab search u-center is-active">名簿一覧</div>
            <div class="p-tab clip   u-center">クリップ (1)</div>
        </div>
        <!-- 本検索フォーム -->
        <div id="main-list">
            <div class="p-main-list-line">
            </div>
            <!-- リスト -->
            <!-- ゆくゆくは、directive化しようかな -->
            <div class="p-search">
                <!-- コマンド-->
                <div class="u-flex">
                    <div class="p-search-condition">
                        <form onsubmit="return false;" style="height:100%">
                            <div class="p-search-condition-box">
                                <h3>氏名 / 組織名</h3>
                                <input type="search" class="u-p100" />
                            </div>
                            <span class="u-vert-sep"></span>
                            <div class="p-search-condition-box">
                                <h3 class="p-search-condition-label">役員区分</h3>
                                <label><input type="checkbox" />役員</label>
                                <label><input type="checkbox" />団体会員</label>
                                <label><input type="checkbox" />賛助会員</label>
                                <label><input type="checkbox" />購読会員</label>
                            </div>
                            <span class="u-vert-sep"></span>
                            <div class="p-search-condition-box">
                                <h3 class="p-search-condition-label">会員・ひろば配布</h3>
                                <label><input type="checkbox" />個人会員</label>
                                <label><input type="checkbox" />団体会員</label>
                                <label><input type="checkbox" />賛助会員</label><br />
                                <label><input type="checkbox" />購読</label>
                                <label><input type="checkbox" />大口配布</label>
                                <label><input type="checkbox" />府市配布</label>
                                <label><input type="checkbox" />寄贈配布</label>
                            </div>
                            <span class="u-vert-sep"></span>
                            <div class="p-search-condition-box">
                                <h3 class="p-search-condition-label">配布期限</h3>
                                <input type="date" style="font-size:10px;" />～<input type="date" style="font-size:10px;" />
                            </div>
                            <span class="u-vert-sep"></span>
                            <div class="p-search-condition-box u-right u-text-m">
                                <a href="#" class="p-search-condition-clear">検索条件をクリア</a>
                            </div>
                            <div class="p-search-condition-box u-center">
                                <button type="submit" class="u-p70">検索</button>
                            </div>
                        </form>
                    </div>

                    <!--  -->
                    <div class="u-p80">
                        <div class="p-commands">
                            <div class="p-command"></div>
                        </div>
                        <div class="p-list">
                            <!-- ページング -->
                            <div class="p-list-head u-flex">
                                <div class="p-pagecnt u-15 u-text-m">
                                    15件中 1-15件
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
                                <button type="button" class="size-s">すべてクリップ</button>
                                <button type="button" class="size-s">すべてのクリップを外す</button>
                            </div>
                            <!-- リスト -->
                            <div class="p-names-list">
                                <div class="p-names-row p-names-header u-flex">
                                    <div class="p-names-clip">Clip</div>
                                    <div class="p-names-mem">会員</div>
                                    <div class="p-names-name">氏名/組織名</div>
                                    <div class="p-names-addr">住所</div>
                                    <div class="p-names-expr">配布期限</div>
                                    <div class="p-names-edit">編集</div>
                                </div>
                                <div class="p-names-row u-row u-flex">
                                    <div class="p-names-clip">○</div>
                                    <div class="p-names-mem">賛助</div>
                                    <div class="p-names-name">first-name</div>
                                    <div class="p-names-addr">大阪府大阪市梅田1-1-100 太郎ビル</div>
                                    <div class="p-names-expr">2014/01/01</div>
                                    <div class="p-names-edit"><button class="size-m">編集</button></div>
                                </div>
                                <div class="p-names-row u-row u-flex">
                                    <div class="p-names-clip">○</div>
                                    <div class="p-names-mem">賛助</div>
                                    <div class="p-names-name">first-name</div>
                                    <div class="p-names-addr">大阪府大阪市梅田1-1-100 太郎ビル</div>
                                    <div class="p-names-expr">2014/01/01</div>
                                    <div class="p-names-edit"><button class="size-m">編集</button></div>
                                </div>
                                <div class="p-names-row u-row u-flex">
                                    <div class="p-names-clip">○</div>
                                    <div class="p-names-mem">賛助</div>
                                    <div class="p-names-name">first-name</div>
                                    <div class="p-names-addr">大阪府大阪市梅田1-1-100 太郎ビル</div>
                                    <div class="p-names-expr">2014/01/01</div>
                                    <div class="p-names-edit"><button class="size-m">編集</button></div>
                                </div>
                                <div class="p-names-row u-row u-flex">
                                    <div class="p-names-clip">○</div>
                                    <div class="p-names-mem">賛助</div>
                                    <div class="p-names-name">first-name</div>
                                    <div class="p-names-addr">大阪府大阪市梅田1-1-100 太郎ビル</div>
                                    <div class="p-names-expr">2014/01/01</div>
                                    <div class="p-names-edit"><button class="size-m">編集</button></div>
                                </div>
                                <div class="p-names-row u-row u-flex">
                                    <div class="p-names-clip">○</div>
                                    <div class="p-names-mem">賛助</div>
                                    <div class="p-names-name">first-name</div>
                                    <div class="p-names-addr">大阪府大阪市梅田1-1-100 太郎ビル</div>
                                    <div class="p-names-expr">2014/01/01</div>
                                    <div class="p-names-edit"><button class="size-m">編集</button></div>
                                </div>
                                <div class="p-names-row u-row u-flex">
                                    <div class="p-names-clip">○</div>
                                    <div class="p-names-mem">賛助</div>
                                    <div class="p-names-name">first-name</div>
                                    <div class="p-names-addr">大阪府大阪市梅田1-1-100 太郎ビル</div>
                                    <div class="p-names-expr">2014/01/01</div>
                                    <div class="p-names-edit"><button class="size-m">編集</button></div>
                                </div>
                                <div class="p-names-row u-row u-flex">
                                    <div class="p-names-clip">○</div>
                                    <div class="p-names-mem">賛助</div>
                                    <div class="p-names-name">first-name</div>
                                    <div class="p-names-addr">大阪府大阪市梅田1-1-100 太郎ビル</div>
                                    <div class="p-names-expr">2014/01/01</div>
                                    <div class="p-names-edit"><button class="size-m">編集</button></div>
                                </div>
                                <div class="p-names-row u-row u-flex">
                                    <div class="p-names-clip">○</div>
                                    <div class="p-names-mem">賛助</div>
                                    <div class="p-names-name">first-name</div>
                                    <div class="p-names-addr">大阪府大阪市梅田1-1-100 太郎ビル</div>
                                    <div class="p-names-expr">2014/01/01</div>
                                    <div class="p-names-edit"><button class="size-m">編集</button></div>
                                </div>
                                <div class="p-names-row u-row u-flex">
                                    <div class="p-names-clip">○</div>
                                    <div class="p-names-mem">賛助</div>
                                    <div class="p-names-name">first-name</div>
                                    <div class="p-names-addr">大阪府大阪市梅田1-1-100 太郎ビル</div>
                                    <div class="p-names-expr">2014/01/01</div>
                                    <div class="p-names-edit"><button class="size-m">編集</button></div>
                                </div>
                                <div class="p-names-row u-row u-flex">
                                    <div class="p-names-clip">○</div>
                                    <div class="p-names-mem">賛助</div>
                                    <div class="p-names-name">first-name</div>
                                    <div class="p-names-addr">大阪府大阪市梅田1-1-100 太郎ビル</div>
                                    <div class="p-names-expr">2014/01/01</div>
                                    <div class="p-names-edit"><button class="size-m">編集</button></div>
                                </div>
                                <div class="p-names-row u-row u-flex">
                                    <div class="p-names-clip">○</div>
                                    <div class="p-names-mem">賛助</div>
                                    <div class="p-names-name">first-name</div>
                                    <div class="p-names-addr">大阪府大阪市梅田1-1-100 太郎ビル</div>
                                    <div class="p-names-expr">2014/01/01</div>
                                    <div class="p-names-edit"><button class="size-m">編集</button></div>
                                </div>
                                <div class="p-names-row u-row u-flex">
                                    <div class="p-names-clip">○</div>
                                    <div class="p-names-mem">賛助</div>
                                    <div class="p-names-name">first-name</div>
                                    <div class="p-names-addr">大阪府大阪市梅田1-1-100 太郎ビル</div>
                                    <div class="p-names-expr">2014/01/01</div>
                                    <div class="p-names-edit"><button class="size-m">編集</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- クリップリスト -->
        <div id="clip-list">
        </div>
    </div>
</div>