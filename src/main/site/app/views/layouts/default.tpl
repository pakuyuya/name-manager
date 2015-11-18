<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
_{foreach from=$metas key=attr item=meta}_
_{foreach from=$meta key=key item=content}_
<meta _{$attr}_>="_{$key}_" content="_{$content}_" />
_{/foreach}_
_{/foreach}_
<script src="_{$request.base_path}_/lib/jquery/jquery-2.1.3.min.js"></script>
<script src="_{$request.base_path}_/lib/angularjs/angularjs.min.js"></script>
<script src="_{$request.base_path}_/js/common.js"></script>
<script src="_{$request.base_path}_/js/tips.js"></script>
<script src="_{$request.base_path}_/js/dialog.js"></script>
_{foreach from=$javascripts item=js}_
<script type="text/javascript" src="_{$request.base_path}_/js/_{$js}_"></script>
_{/foreach}_

<link rel="stylesheet" type="text/css" href="_{$request.base_path}_/css/common.css" />
<link rel="stylesheet" type="text/css" media="screen" href="_{$request.base_path}_/css/screen.css"/>
<link rel="stylesheet" type="text/css" media="print" href="_{$request.base_path}_/css/print.css"/>
_{foreach from=$stylesheets item=css}_
<link rel="stylesheet" type="text/css" href="_{$request.base_path}_/css/_{$css}_" />
_{/foreach}_
<title>_{if $page_title != ''}__{$page_title}__{/if}_</title>
</head>
<body>

_{$inner_contents}_

</body>
</html>