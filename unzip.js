var zip = require('./zip');

module.exports = function unzip(blob, cb) {
	zip.createReader(new zip.BlobReader(blob), function(zipReader) {
		zipReader.getEntries(function(entries) {
			entries[0].getData(new zip.BlobWriter(zip.getMimeType(entries[0].filename)), function(data) {
				zipReader.close();
				cb(data);
			});
		});
	}, function unzipError (e) {
		cb(e);
	});
};
	