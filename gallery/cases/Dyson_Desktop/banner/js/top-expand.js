Premium.addon = Premium.addon || {}, Premium.addon.topExpandable = function(e) {
	if ("body_top" === document.body.id || "body-top" === document.body.id) {
		var a, t;
		try { a = window.top.document.getElementById("jpx-wp-layer-top-container") || window.top.document.getElementById("iframe_creative_top"), t = window.top } catch (e) {}
		if (a) {
			e = e || 560;
			var d = Premium.general.local ? "#iframe_creative_top" : "#jpx-wp-layer-top-container",
				n = d + "{transition:height 500ms;} " + d + ".jp-wp-layer-top-expanded{height:" + e + "px !important;} body{transition:margin-top 500ms;} .jp-body-expand{margin-top:" + (e + 50) + "px !important;}";
			if (Premium.general.local) {
				var o = document.createElement("STYLE");
				o.type = "text/css", o.styleSheet ? o.styleSheet.cssText = n : o.appendChild(document.createTextNode(n)), t.document.head.appendChild(o)
			} else Premium.jpxApi.addSheet(n);
			var p = t.document.body;
			p && (a.addEventListener("mouseenter", function() { p.className += " jp-body-expand", a.className += " jp-wp-layer-top-expanded" }), a.addEventListener("mouseleave", function() { p.className = p.className.replace(" jp-body-expand", ""), a.className = a.className.replace(" jp-wp-layer-top-expanded", "") }), window.addEventListener("unload", function(e) { p.className = p.className.replace(" jp-body-expand", ""), a.className = a.className.replace(" jp-wp-layer-top-expanded", "") }))
		}
	}
};