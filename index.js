var AWS = require('aws-sdk');

AWS.config.update({
    "accessKeyId": "aws_acess_key",
    "secretAccessKey":"secret_key",
    "region": "reagin" });

var s3 = new AWS.S3();
var get_params = {
  Bucket: 'bucket-name',
  Key: 'key-name',
  Expires: 100, // 有効期限(秒)
  ResponseContentType: 'application/json',
};

var put_params = {
  Bucket: 'bucket-name',
  Key: 'key-name',
  Expires: 100,
  // content-typeを指定すると、このヘッダ込の署名になるので、
  // 実際にPUTするときに必ずこのHTTPヘッダも必要になる
  ContentType: 'application/json',
};

s3.getSignedUrl('getObject', get_params, function (err, url) {
  var getUrl = url;

  s3.getSignedUrl('putObject', put_params, function (err, url) {
    var putUrl = url;
    console.log(JSON.stringify({
      getUrl: getUrl,
      putUrl: putUrl,
    }));
  });
});

