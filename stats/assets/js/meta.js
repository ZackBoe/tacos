!function(){
  var meta = new Keen({
    projectId: "545f8c53bcb79c130f59290d",
    writeKey: "1bf7e7800c224c46e4cb87814851ad17e7424189894b1a89842a6b55e2777f6d9a9d90716dae7f008793636741afe06288134c48630738694ce549025ab35760a0b59045ac053fbea09e996309393c0442d80356622fcb1cf8be4843d5e71ba0b396d953836b755094853c4d431fa274"
  });
  meta.addEvent("visits", {
    page: {
      title: document.title,
      host: document.location.host,
      href: document.location.href,
      path: document.location.pathname,
      protocol: document.location.protocol.replace(/:/g, ""),
      query: document.location.search
    },
    visitor: {
      referrer: document.referrer,
      ip_address: "${keen.ip}",
      // tech: {} //^ created by ip_to_geo add-on
      user_agent: "${keen.user_agent}"
      // visitor: {} //^ created by ua_parser add-on
    },
    keen: {
      timestamp: new Date().toISOString(),
      addons: [
        { name:"keen:ip_to_geo", input: { ip:"visitor.ip_address" }, output:"visitor.geo" },
        { name:"keen:ua_parser", input: { ua_string:"visitor.user_agent" }, output:"visitor.tech" }
      ]
    }
  });
  // More data modeling examples here:
  // https://github.com/keenlabs/data-modeling-guide/
}();
