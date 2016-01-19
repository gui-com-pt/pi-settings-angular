(function(){
  angular
    .module('pi.settings')
    .factory('piSettingsMode', [function() {
      var svc = {
        localStorage: 'localStorage'
      };

      return svc;
    }])
    .provider('piSettings', [function(){
      var mode;

      function typeOf (obj) {
        return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
      }

			this.$get = ['$window', 'piSettingsMode', function($window, piSettingsMode){
        var self = this;

        mode = piSettingsMode.localStorage;

        this.setMode = function(value) {
  				mode = value;
  			}

        this.getMode = function() {
          return mode;
        }

        this.saveValue = function(key, value) {
          $window.localStorage[key] = value;
          $window.localStorage[key + '::type'] = typeOf(value);
        }

        this.saveArray = function(key, values) {
          $window.localStorage[key] = value;
        }

        this.get = function(key, defaultValue) {
          var val = $window.localStorage[key] || defaultValue,
              valType = $window.localStorage[key + '::type'];
          if(_.isString(valType) && valType != 'string') {
            return JSON.parse(val);
          }
          return val;
        }

        this.getObject = function(key) {
          return JSON.parse($window.localStorage[key] || '{}');
        }

        this.saveObject = function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        }

				return {
					getMode: function() {
						return mode;
					},
          set: function(key, value) {
              if(_.isArray(value)) {
                self.saveArray(key, value);
              } else if(_.isObject(value)) {
                self.saveObject(key, value);
              } else {
                self.saveValue(key, value);
              }
          },
          get: function(key) {
            return self.get(key);
          },
          getObject: function(key) {
            return self.getObject(key);
          }
				}
			}];
		}]);
})();
