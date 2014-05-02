define([
  'd3',
  'utils',
  'defaults',
  'data',
  'scale',
  'layout',
  'components/components',
], function(
  d3,
  utils,
  defaults,
  data_module,
  scale,
  layout,
  components_module
) {
  'use strict';

  var defaults = defaults,
      utils  = utils,
      extend = utils.extend,
      getset = utils.getset;

  function composer (user_config) {

    var config = user_config || {},
        __     = extend(defaults, config);

    function chart (selection, options) {
      var is_frame = (!options || options.is_frame === "undefined") ? false : options.is_frame,
          old_frame_identifier = (!options || options.old_frame_identifier === "undefined") ? void 0 : options.old_frame_identifier,
          data = selection.datum(),
          svg,
          g,
          transition;

      // TODO: run a validation function on __, if debug mode.

      data = data_module.normalizeData(__);
      __.data = data;
      __ = data_module.setDelay(__); //FIXME and TESTME
      __ = layout.setDimensions(selection, __);
      __ = scale.setScales(__);

      scale.applyScales(__); //TESTME

      // Select the svg element, if it exists.
      svg = selection.selectAll("svg").data([data]);
      // Otherwise, create the skeletal chart.
      g = svg.enter().append("svg").append("g");
      // Update the outer dimensions.
      svg.attr("width", __.width).attr("height", __.height);
      // Update the inner dimensions.
      g.attr("transform", "translate(" + 
        __.margin.left + "," + __.margin.top + ")");
      // Transitions root.
      transition = g.transition().duration(__.duration);

      __.components.forEach( function (component) {
        var method_name;
        if (components_module[component]) {
          method_name = composer.toCamelCase('draw_' + component);
          components_module[component][method_name](g, transition, __);
        }
      });

    }

    getset(chart, __);

    return chart;

  }

  return composer;

});