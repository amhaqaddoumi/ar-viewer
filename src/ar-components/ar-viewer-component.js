const arViewerComponent = {
  init: function() {
    const el = this.el;
    const data = this.data;
    data.currentView = 0;
    el.setAttribute('id', 'ar-viewer');

    let views = [];
    for (let i = 0; i < el.children.length; i++) {
      if (el.children[i].components['ar-view'] != undefined) {
        views.push(el.children[i]);
        if (i != 0) {
          el.children[i].components['ar-view'].hide();
        }
      }
    }
    data.views = views;
  },
  previous: function() {
    const data = this.data;
    if (data.currentView > 0) {
      data.views[data.currentView].components['ar-view'].hide();
      data.currentView -= 1;
      data.views[data.currentView].components['ar-view'].reset();
      data.views[data.currentView].components['ar-view'].show();
    } else {
      data.views[data.currentView].components['ar-view'].hide();
      data.currentView = data.views.length - 1;
      data.views[data.currentView].components['ar-view'].reset();
      data.views[data.currentView].components['ar-view'].show();
    }
  },
  next: function() {
    const data = this.data;
    if (data.currentView < data.views.length - 1) {
      data.views[data.currentView].components['ar-view'].hide();
      data.currentView += 1;
      data.views[data.currentView].components['ar-view'].reset();
      data.views[data.currentView].components['ar-view'].show();
    } else {
      data.views[data.currentView].components['ar-view'].hide();
      data.currentView = 0;
      data.views[data.currentView].components['ar-view'].reset();
      data.views[data.currentView].components['ar-view'].show();
    }
  },
  reset: function() {
    const data = this.data;
    data.views[data.currentView].components['ar-view'].reset();
  }
}

export default arViewerComponent;