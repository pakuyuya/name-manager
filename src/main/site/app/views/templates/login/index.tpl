<div ng-app="app">
    <section class="p-login" ng-controller="loginCtrl">
        <div class="p-title">
            <h2 class="p-title-text">Welcome</h2>
            <div class="p-title-underline"></div>
        </div>
        <form id="login-form" class="p-form" action="main" method="post" ng-submit="sendLogin()" onsubmit="return false">

            <div class="c-line">
                <label for="loginid"><span class="icon-user"></span></label>
                <input type="text" id="loginid" class="size-m" ng-model="loginid" placeholder="user id" ng-change="clearError()" />
            </div>
            <div class="c-line">
                <label for="loginpw"><span class="icon-key"></span></label>
                <input type="password" id="loginpw" class="size-m" ng-model="loginpw" placeholder="password" ng-change="clearError()" />
            </div>
            <div class="p-form-cmd c-line">
                <button id="login-button" type="submit" class="primary">Login</button>
            </div>
        </form>
        <div class="c-line" ng-if="!!error">
            <div class="c-infobox error">{{error}}</div>
        </div>
    </section>
</div>