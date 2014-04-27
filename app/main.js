define({

	// Load a basic theme. This is just a CSS file, and since a moduleLoader is
	// configured in run.js, curl knows to load this as CSS.
	theme: { module: 'theme/basic.css' },

	chart_constructor: {
		create: {
			module: 'chart',
		}
	},

	// Create a simple view by rendering html, replacing some i18n strings
	// and loading CSS.  Then, insert into the DOM
	//inline_example: {
	//	render: {
	//		template: { module: 'text!inline/template.html' },
	//		replace: { module: 'i18n!inline/strings' },
	//		css: { module: 'css!inline/structure.css' }
	//	},
	//	insert: { at: 'dom.first!.inline' }
	//},

  //inline_controller: {
  //	create: {
  //    module: 'inline/controller',
  //    args: {
  //      //chart: {$ref: "chart_constructor"},
  //      data_url: 'app/inline/data.json',
  //      el: {$ref: "inline_example"},
  //      selector: '#inline-viz'
  //    }
  //  }
  //},


//  line_frame_example: {
//    render: {
//      template: { module: 'text!line_frame/template.html' },
//      replace: { module: 'i18n!line_frame/strings' },
//      css: { module: 'css!line_frame/structure.css' }
//    },
//    insert: { at: 'dom.first!.line_frame' }
//  },
//
//  line_frame_controller: {
//    create: {
//      module: 'line_frame/controller',
//      args: {
//        //chart: {$ref: "chart_constructor"},
//        data_url: 'app/line_frame/data.csv',
//        el: {$ref: "line_frame_example"},
//        selector: '#line_frame-viz'
//      }
//    }
//  },

  // Create a simple view by rendering html, replacing some i18n strings
  // and loading CSS.  Then, insert into the DOM
//  frame_example: {
//    render: {
//      template: { module: 'text!frame/template.html' },
//      replace: { module: 'i18n!frame/strings' },
//      css: { module: 'css!frame/structure.css' }
//    },
//    insert: { at: 'dom.first!.frame' }
//  },
//
//  frame_controller: {
//    create: {
//      module: 'frame/controller',
//      args: {
//        //chart: {$ref: "chart_constructor"},
//        data_url: 'app/frame/data.json',
//        el: {$ref: "frame_example"},
//        selector: '#frame-viz'
//      }
//    }
//  },

//  // Create a simple view by rendering html, replacing some i18n strings
//	// and loading CSS.  Then, insert into the DOM
//	tooltip_example: {
//		render: {
//			template: { module: 'text!tooltip/template.html' },
//			replace: { module: 'i18n!tooltip/strings' },
//			css: { module: 'css!tooltip/structure.css' }
//		},
//		insert: { at: 'dom.first!.tooltip' }
//	},
//
//  tooltip_controller: {
//  	create: {
//      module: 'tooltip/controller',
//      args: {
//        //chart: {$ref: "chart_constructor"},
//        data_url: 'app/tooltip/data.json',
//        el: {$ref: "tooltip_example"},
//        selector: '#tooltip-viz'
//      }
//    }
//  },
//
//  // Create a simple view by rendering html, replacing some i18n strings
//  // and loading CSS.  Then, insert into the DOM
//  timeseries_example: {
//    render: {
//      template: { module: 'text!timeseries/template.html' },
//      replace: { module: 'i18n!timeseries/strings' },
//      css: { module: 'css!timeseries/structure.css' }
//    },
//    insert: { at: 'dom.first!.timeseries' }
//  },
//
//  timeseries_controller: {
//    create: {
//      module: 'timeseries/controller',
//      args: {
//        //chart: {$ref: "chart_constructor"},
//        data_url: 'app/timeseries/data.json',
//        el: {$ref: "timeseries_example"},
//        selector: '#timeseries-viz'
//      }
//    }
//  },
//
  // Create a simple view by rendering html, replacing some i18n strings
  // and loading CSS.  Then, insert into the DOM
  line_example: {
    render: {
      template: { module: 'text!line/template.html' },
      replace: { module: 'i18n!line/strings' },
      css: { module: 'css!line/structure.css' }
    },
    insert: { at: 'dom.first!.line' }
  },

  line_controller: {
    create: {
      module: 'line/controller',
      args: {
        //chart: {$ref: "chart_constructor"},
        data_url: 'app/line/data.json',
        el: {$ref: "line_example"},
        selector: '#line-viz'
      }
    }
  },

	// Wire.js plugins
	plugins: [
		{ module: 'wire/dom', classes: { init: 'loading' } },
		{ module: 'wire/dom/render' }
	]
});