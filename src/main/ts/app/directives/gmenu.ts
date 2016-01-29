import {appName} from '../constants';

class Gmenu {
        restrict = 'E';
        priority = 0;
        transclude = true;
        replace = true;
        templateUrl = 'html/gmenu.html';
        score = {
            show : '=',
        };
        controllerAs = "gmenu";
        controller = ['$scope', GmenuCtrl];
 }

class GmenuCtrl{
    show : boolean = false;

    constructor($scope){
    }

    public toggle() {
        this.show = !this.show;
    }
}

angular.module(appName).directive('gmenu', () => new Gmenu() );
