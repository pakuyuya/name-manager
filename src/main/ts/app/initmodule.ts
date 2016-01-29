// Angularモジュールを使用するときに、まず最初に実行しなければならない。
// service, resource, directiveなどは以下で作成したmoudleを参照する。
import {appName} from './constants';
export = angular.module(appName, ['ngResource', 'checklist-model']);
