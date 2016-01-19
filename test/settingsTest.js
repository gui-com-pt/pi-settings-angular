describe('Settings Service Test', function() {
  var piSettings,
      piSettingsMode;

  beforeEach(function() {
    module('pi.settings');
  });

  beforeEach(inject(function(_piSettings_, _piSettingsMode_) {
      piSettings = _piSettings_;
      piSettingsMode = _piSettingsMode_;
  }));

  it('should start and setup the initial configuration', function() {
    expect(piSettings).toBeDefined();
  });

  it('should set default module', function() {
    expect(piSettings.getMode()).toBe(piSettingsMode.localStorage);
  });

  it('should set and get string value', function() {
    piSettings.set('test', 'text');
    expect(piSettings.get('test')).toBe('text');
  });

  it('should set and get integer value', function() {
    piSettings.set('test', 911);
    expect(piSettings.get('test')).toBe(911);
  });

  it('should set and get decimal value', function() {
    piSettings.set('test', 911.11);
    expect(piSettings.get('test')).toBe(911.11);
  });

  it('should set and get boolean value', function() {
    piSettings.set('test', false);
    expect(piSettings.get('test')).toBe(false);
  });

});
