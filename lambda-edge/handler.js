function viewerRequest (event, context, callback) {
  const request = event.Records[0].cf.request;
  const headers = request.headers;
  const user_agent = headers['user-agent'];
  const hostHeaders = headers['host'];

  if(user_agent && hostHeaders) {
    const host = hostHeaders[0].value;
    var prerender = /googlebot|adsbot\-google|Feedfetcher\-Google|bingbot|yandex|baiduspider|Facebot|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator/i.test(user_agent[0].value);
    prerender = prerender || /_escaped_fragment_/.test(request.querystring);
    prerender = prerender && ! /\.(js|css|xml|less|png|jpg|jpeg|gif|pdf|doc|txt|ico|rss|zip|mp3|rar|exe|wmv|doc|avi|ppt|mpg|mpeg|tif|wav|mov|psd|ai|xls|mp4|m4a|swf|dat|dmg|iso|flv|m4v|torrent|ttf|woff|svg|eot)$/i.test(request.uri);
    if(prerender) {
      console.log("Crawler esta tentando acessar -- marcando requisicao");
      headers['x-should-prerender'] = [{ key: "X-Should-Prerender", value: "true"}];
      headers['x-prerender-url'] = [{ key: "X-Prerender-Url", value: host}];
    }
  }
  callback(null, request);
}

function originRequest (event, context, callback) {
  const request = event.Records[0].cf.request;
  if(request.headers['x-should-prerender'] && request.headers['x-prerender-url']) {
    const url = request.headers['x-prerender-url'][0].value;
    request.headers.host = [{key: "Host", value: "pyq1nafuoj.execute-api.us-east-1.amazonaws.com"}];
    request.origin = {
      custom: {
        domainName: "pyq1nafuoj.execute-api.us-east-1.amazonaws.com",
        port: 443,
        protocol: 'https',
        readTimeout: 30,
        keepaliveTimeout: 5,
        customHeaders: {},
        sslProtocols: ['TLSv1', 'TLSv1.1'],
        path: '/dev/https://' + url
      }
    }
  }
  callback(null, request);
}

module.exports.viewerRequest = viewerRequest;
module.exports.originRequest = originRequest;