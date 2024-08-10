
// base64 编码与解码
// atob(encodedData)
// btoa()

export function base64Encode(data: string): string {
  return btoa(encodeURIComponent(data));
}

export function base64Decode(encodedData: string): string {
  return decodeURIComponent(atob(encodedData));
}

// encodeURI 
// and decodeURI are similar to base64 encoding and decoding, but they handle special characters differently.
// encodeURI() encodes a URI by replacing certain characters with escape sequences.
// decodeURI() decodes a URI encoded with encodeURI().


/**
 * encodeURI()
encodeURI()通常用于转码整个 URL，不会对URL 元字符以及语义字符进行转码

URL 元字符：分号;，逗号,，斜杠/，问号?，冒号:，at@，&，等号=，加号+，美元符号$，井号#
语义字符：a-z，A-Z，0-9，连词号-，下划线_，点.，感叹号!，波浪线~，星号*，单引号'，圆括号()
 */
export function uriEncode(uri: string): string {
  return encodeURI(uri);
}

export function uriDecode(encodedUri: string): string {
  return decodeURI(encodedUri);
}

/**
 * encodeURIComponent()通常只用于转码URL组成部分，如URL中?后的一串；会转码除了语义字符之外的所有字符，即元字符也会被转码
 *  对于无特殊参数的链接，都可以使用encodeURI()进行转码，那什么特殊情况需要用到encodeURIComponent()呢？通常是链接带着一些特殊参数的时候，就比如以下链接：
 */


export function uriCompEncode(uri: string): string {
  return encodeURIComponent(uri);
}

export function uriCompDecode(encodedUri: string): string {
  return decodeURIComponent(encodedUri);
}



