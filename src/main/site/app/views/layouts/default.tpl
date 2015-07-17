<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
{{foreach from=$metas key=attr item=meta}}
{{foreach from=$meta key=key item=content}}
<meta {{$attr}}="{{$key}}" content="{{$content}}" />
{{/foreach}}
{{/foreach}}
<script src="{{$request.base_path}}/lib/underscore/underscore-min.js"></script>
<script src="{{$request.base_path}}/lib/jquery/jquery-2.1.3.min.js"></script>
<script src="{{$request.base_path}}/lib/backbone/backbone-min.js"></script>
<script src="{{$request.base_path}}/js/common.js"></script>
<script src="{{$request.base_path}}/js/tips.js"></script>
<script src="{{$request.base_path}}/js/dialog.js"></script>
{{foreach from=$javascripts item=js}}
<script type="text/javascript" src="{{$request.base_path}}/js/{{$js}}"></script>
{{/foreach}}

<link rel="stylesheet" type="text/css" href="{{$request.base_path}}/css/common.css" />
<link rel="stylesheet" type="text/css" media="screen" href="{{$request.base_path}}/css/screen.css"/>
<link rel="stylesheet" type="text/css" media="print" href="{{$request.base_path}}/css/print.css"/>
{{foreach from=$stylesheets item=css}}
<link rel="stylesheet" type="text/css" href="{{$request.base_path}}/css/{{$css}}" />
{{/foreach}}
<title>{{if $page_title != ''}}{{$page_title}}{{/if}}</title>
</head>
<body>

{{$inner_contents}}

</body>
</html>