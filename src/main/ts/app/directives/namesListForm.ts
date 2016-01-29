/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants';
import {NamesService, NamesDto} from '../services/namesService';

class NamesListFormDirectiveController {

};

class NamesListFormDirective {
    restrict = 'E';
    controller = ['Names', NamesListFormDirectiveController];
    controllerAs = 'namesListForm';
    replace = true;
};

angular.module(appName).directive('namesListForm', function(){return new NamesListFormDirective();} );