define('mixins/data', [
  "d3"
], function (d3) {

  function dataIdentifier (d) {
    return d[0];
  }

  function setDelay () {
    var __ = this.__,
        duration = __.duration,
        data = __.data;
    if (duration == undefined) { throw new Error('__.duration unset')}
    __.delay = function (d, i) {
      // FIXME: only referring to the first dataset, 
      // while setting the delay on all!
      return i / data[0].length * duration;
    }
    return this;
  };

  function normalizeData () {
    var data = this.selection.datum(),
        __ = this.__,
        parsed_data = [],
        date_chart = __.x_scale == 'time' ? true : false,
        date_format = __.date_format,
        date_type = __.date_type,
        categoricalValue = __.categoricalValue;
    data.forEach( function (dataset, index) {
      if (date_chart) {
        parsed_data.push(dataset.map(function(d, i) {
          var x;
          // The time data is encoded in a string:
          if (date_chart && date_type == 'string') {
            x = d3.time.format(date_format)
              .parse(categoricalValue.call(dataset, d));
          // The time data is encoded in an epoch number:
          } else if (date_chart && __.date_type == 'epoch') {
            x = new Date(categoricalValue.call(dataset, d) * 1000);
          } 
          return [x, __.quantativeValue.call(dataset, d)];
        }));
      } else {
        dataset = __.invert_data ? this.clone(dataset).reverse() : dataset;
        parsed_data.push(dataset.map(function(d, i) {
          var x = __.categoricalValue.call(dataset, d);
          return [x, __.quantativeValue.call(dataset, d)];
        }));
      }
    });
    __.data = parsed_data;
    return this;
  }

  return function () {
    this.dataIdentifier = dataIdentifier;
    this.setDelay = setDelay;
    this.normalizeData = normalizeData;
    return this;
  };

});

