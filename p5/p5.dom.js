/*! p5.dom.js v0.2.2 May 30, 2015 */
(function (a, b) {
  if (typeof define === "function" && define.amd) {
    define("p5.dom", ["p5"], function (c) {
      b(c);
    });
  } else {
    if (typeof exports === "object") {
      b(require("../p5"));
    } else {
      b(a.p5);
    }
  }
})(this, function (b) {
  b.prototype.select = function (h) {
    var g;
    var i;
    if (h[0] === ".") {
      i = h.slice(1);
      g = document.getElementsByClassName(i);
      if (g) {
        return e(g[0]);
      } else {
        return null;
      }
    } else {
      if (h[0] === "#") {
        i = h.slice(1);
        g = document.getElementById(i);
        if (g) {
          return e(g);
        } else {
          return null;
        }
      } else {
        g = document.getElementsByTagName(h);
        if (g) {
          return e(g[0]);
        } else {
          return null;
        }
      }
    }
  };
  b.prototype.selectAll = function (l) {
    var g = [];
    var i;
    var m;
    if (l[0] === ".") {
      m = l.slice(1);
      i = document.getElementsByClassName(m);
    } else {
      i = document.getElementsByTagName(l);
    }
    if (i) {
      for (var h = 0; h < i.length; h++) {
        var k = e(i[h]);
        g.push(k);
      }
    }
    return g;
  };
  function e(g) {
    if (g.tagName === "VIDEO" || g.tagName === "AUDIO") {
      return new b.MediaElement(g);
    } else {
      return new b.Element(g);
    }
  }
  b.prototype.removeElements = function (h) {
    for (var g = 0; g < this._elements.length; g++) {
      if (!(this._elements[g].elt instanceof HTMLCanvasElement)) {
        this._elements[g].remove();
      }
    }
  };
  function d(g, h, j) {
    var i = h._userNode ? h._userNode : document.body;
    i.appendChild(g);
    var k = j ? new b.MediaElement(g) : new b.Element(g);
    h._elements.push(k);
    return k;
  }
  var a = ["div", "p", "span"];
  a.forEach(function (g) {
    var h = "create" + g.charAt(0).toUpperCase() + g.slice(1);
    b.prototype[h] = function (j) {
      var i = document.createElement(g);
      i.innerHTML = typeof j === undefined ? "" : j;
      return d(i, this);
    };
  });
  b.prototype.createImg = function () {
    var i = document.createElement("img");
    var h = arguments;
    var g = {};
    var j = function () {
      g.width = i.width;
      g.height = i.height;
      if (h.length === 3 && typeof h[2] === "function") {
        g.fn = h[2];
        g.fn();
      }
    };
    i.src = h[0];
    if (h.length > 1 && typeof h[1] === "string") {
      i.alt = h[1];
    }
    if (i.complete) {
      j();
    } else {
      i.onload = function () {
        j();
      };
    }
    g = d(i, this);
    return g;
  };
  b.prototype.createA = function (g, i, j) {
    var h = document.createElement("a");
    h.href = g;
    h.innerHTML = i;
    if (j) {
      h.target = j;
    }
    return d(h, this);
  };
  b.prototype.createSlider = function (i, g, k, j) {
    var h = document.createElement("input");
    h.type = "range";
    h.min = i;
    h.max = g;
    if (j) {
      h.step = j;
    }
    if (k) {
      h.value = k;
    }
    return d(h, this);
  };
  b.prototype.createButton = function (h, i) {
    var g = document.createElement("button");
    g.innerHTML = h;
    g.value = i;
    if (i) {
      g.value = i;
    }
    return d(g, this);
  };
  b.prototype.createInput = function (h) {
    var g = document.createElement("input");
    g.type = "text";
    if (h) {
      g.value = h;
    }
    return d(g, this);
  };
  b.prototype.createFileInput = function (j, g) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var h = document.createElement("input");
      h.type = "file";
      if (g) {
        h.multiple = "multiple";
      }
      h.addEventListener("change", i, false);
      function i(l) {
        var o = l.target.files;
        for (var n = 0; n < o.length; n++) {
          var p = o[n];
          var k = new FileReader();
          k.onload = m(p);
          function m(r) {
            var q = new b.File(r);
            return function (s) {
              q.data = s.target.result;
              j(q);
            };
          }
          if (p.type === "text") {
            k.readAsText(p);
          } else {
            k.readAsDataURL(p);
          }
        }
      }
      return d(h, this);
    } else {
      console.log(
        "The File APIs are not fully supported in this browser. Cannot create element."
      );
    }
  };
  function f(k, j, m, o) {
    var g = document.createElement(j);
    if (typeof m === "string") {
      m = [m];
    }
    for (var h = 0; h < m.length; h++) {
      var l = document.createElement("source");
      l.src = m[h];
      g.appendChild(l);
    }
    if (typeof o !== "undefined") {
      g.addEventListener("canplaythrough", function () {
        o();
      });
    }
    var n = d(g, k, true);
    n.loadedmetadata = false;
    g.addEventListener("loadedmetadata", function () {
      n.width = g.videoWidth;
      n.height = g.videoHeight;
      n.loadedmetadata = true;
    });
    return n;
  }
  b.prototype.createVideo = function (g, h) {
    return f(this, "video", g, h);
  };
  b.prototype.createAudio = function (g, h) {
    return f(this, "audio", g, h);
  };
  b.prototype.VIDEO = "video";
  b.prototype.AUDIO = "audio";
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  b.prototype.createCapture = function () {
    var l = true;
    var k = true;
    var n;
    var g;
    for (var j = 0; j < arguments.length; j++) {
      if (arguments[j] === b.prototype.VIDEO) {
        k = false;
      } else {
        if (arguments[j] === b.prototype.AUDIO) {
          l = false;
        } else {
          if (typeof arguments[j] === "object") {
            n = arguments[j];
          } else {
            if (typeof arguments[j] === "function") {
              g = arguments[j];
            }
          }
        }
      }
    }
    if (navigator.getUserMedia) {
      var h = document.createElement("video");
      if (!n) {
        n = { video: l, audio: k };
      }
      navigator.getUserMedia(
        n,
        function (i) {
          h.src = window.URL.createObjectURL(i);
          h.play();
          if (g) {
            g(i);
          }
        },
        function (i) {
          console.log(i);
        }
      );
    } else {
      throw "getUserMedia not supported in this browser";
    }
    var m = d(h, this, true);
    m.loadedmetadata = false;
    h.addEventListener("loadedmetadata", function () {
      m.width = h.videoWidth;
      m.height = h.videoHeight;
      m.loadedmetadata = true;
    });
    return m;
  };
  b.prototype.createElement = function (g, i) {
    var h = document.createElement(g);
    if (typeof i !== "undefined") {
      h.innerHTML = i;
    }
    return d(h, this);
  };
  b.Element.prototype.addClass = function (g) {
    if (this.elt.className) {
      this.elt.className = this.elt.className + " " + g;
    } else {
      this.elt.className = g;
    }
    return this;
  };
  b.Element.prototype.removeClass = function (h) {
    var g = new RegExp("(?:^|\\s)" + h + "(?!\\S)");
    this.elt.className = this.elt.className.replace(g, "");
    this.elt.className = this.elt.className.replace(/^\s+|\s+$/g, "");
    return this;
  };
  b.Element.prototype.child = function (g) {
    if (typeof g === "string") {
      g = document.getElementById(g);
    } else {
      if (g instanceof b.Element) {
        g = g.elt;
      }
    }
    this.elt.appendChild(g);
    return this;
  };
  b.Element.prototype.html = function (g) {
    if (typeof g !== "undefined") {
      this.elt.innerHTML = g;
      return this;
    } else {
      return this.elt.innerHTML;
    }
  };
  b.Element.prototype.position = function () {
    if (arguments.length === 0) {
      return { x: this.elt.offsetLeft, y: this.elt.offsetTop };
    } else {
      this.elt.style.position = "absolute";
      this.elt.style.left = arguments[0] + "px";
      this.elt.style.top = arguments[1] + "px";
      this.x = arguments[0];
      this.y = arguments[1];
      return this;
    }
  };
  b.Element.prototype.translate = function () {
    this.elt.style.position = "absolute";
    if (arguments.length === 2) {
      var g = this.elt.style.transform.replace(/translate3d\(.*\)/g, "");
      g = g.replace(/translate[X-Z]?\(.*\)/g, "");
      this.elt.style.transform =
        "translate(" + arguments[0] + "px, " + arguments[1] + "px)";
      this.elt.style.transform += g;
    } else {
      if (arguments.length === 3) {
        var g = this.elt.style.transform.replace(/translate3d\(.*\)/g, "");
        g = g.replace(/translate[X-Z]?\(.*\)/g, "");
        this.elt.style.transform =
          "translate3d(" +
          arguments[0] +
          "px," +
          arguments[1] +
          "px," +
          arguments[2] +
          "px)";
        this.elt.style.transform += g;
        this.elt.parentElement.style.perspective = "1000px";
      } else {
        if (arguments.length === 4) {
          var g = this.elt.style.transform.replace(/translate3d\(.*\)/g, "");
          g = g.replace(/translate[X-Z]?\(.*\)/g, "");
          this.elt.style.transform =
            "translate3d(" +
            arguments[0] +
            "px," +
            arguments[1] +
            "px," +
            arguments[2] +
            "px)";
          this.elt.style.transform += g;
          this.elt.parentElement.style.perspective = arguments[3] + "px";
        }
      }
    }
    return this;
  };
  b.Element.prototype.rotate = function () {
    if (arguments.length === 1) {
      var g = this.elt.style.transform.replace(/rotate3d\(.*\)/g, "");
      g = g.replace(/rotate[X-Z]?\(.*\)/g, "");
      this.elt.style.transform = "rotate(" + arguments[0] + "deg)";
      this.elt.style.transform += g;
    } else {
      if (arguments.length === 2) {
        var g = this.elt.style.transform.replace(/rotate3d\(.*\)/g, "");
        g = g.replace(/rotate[X-Z]?\(.*\)/g, "");
        this.elt.style.transform =
          "rotate(" + arguments[0] + "deg, " + arguments[1] + "deg)";
        this.elt.style.transform += g;
      } else {
        if (arguments.length === 3) {
          var g = this.elt.style.transform.replace(/rotate3d\(.*\)/g, "");
          g = g.replace(/rotate[X-Z]?\(.*\)/g, "");
          this.elt.style.transform = "rotateX(" + arguments[0] + "deg)";
          this.elt.style.transform += "rotateY(" + arguments[1] + "deg)";
          this.elt.style.transform += "rotateZ(" + arguments[2] + "deg)";
          this.elt.style.transform += g;
        }
      }
    }
    return this;
  };
  b.Element.prototype.style = function (m, l) {
    if (typeof l === "undefined") {
      var g = m.split(";");
      for (var h = 0; h < g.length; h++) {
        var k = g[h].split(":");
        if (k[0] && k[1]) {
          this.elt.style[k[0].trim()] = k[1].trim();
        }
      }
    } else {
      this.elt.style[m] = l;
      if (m === "width" || m === "height" || m === "left" || m === "top") {
        var j = l.replace(/\D+/g, "");
        this[m] = parseInt(j);
      }
    }
    return this;
  };
  b.Element.prototype.attribute = function (g, h) {
    if (typeof h === "undefined") {
      return this.elt.getAttribute(g);
    } else {
      this.elt.setAttribute(g, h);
      return this;
    }
  };
  b.Element.prototype.value = function () {
    if (arguments.length > 0) {
      this.elt.value = arguments[0];
      return this;
    } else {
      if (this.elt.type === "range") {
        return parseFloat(this.elt.value);
      } else {
        return this.elt.value;
      }
    }
  };
  b.Element.prototype.show = function () {
    this.elt.style.display = "block";
    return this;
  };
  b.Element.prototype.hide = function () {
    this.elt.style.display = "none";
    return this;
  };
  b.Element.prototype.size = function (i, o) {
    if (arguments.length === 0) {
      return { width: this.elt.offsetWidth, height: this.elt.offsetHeight };
    } else {
      var p = i;
      var g = o;
      var n = b.prototype.AUTO;
      if (p !== n || g !== n) {
        if (p === n) {
          p = (o * this.width) / this.height;
        } else {
          if (g === n) {
            g = (i * this.height) / this.width;
          }
        }
        if (this.elt instanceof HTMLCanvasElement) {
          var m = {};
          var l = this.elt.getContext("2d");
          for (var q in l) {
            m[q] = l[q];
          }
          this.elt.setAttribute("width", p * this._pInst._pixelDensity);
          this.elt.setAttribute("height", g * this._pInst._pixelDensity);
          this.elt.setAttribute(
            "style",
            "width:" + p + "px; height:" + g + "px"
          );
          this._pInst.scale(
            this._pInst._pixelDensity,
            this._pInst._pixelDensity
          );
          for (var q in m) {
            this.elt.getContext("2d")[q] = m[q];
          }
        } else {
          this.elt.style.width = p + "px";
          this.elt.style.height = g + "px";
          this.elt.width = p;
          this.elt.height = g;
          this.width = p;
          this.height = g;
        }
        this.elt.style.overflow = "hidden";
        this.width = this.elt.offsetWidth;
        this.height = this.elt.offsetHeight;
        if (this._pInst) {
          if (this._pInst._curElement.elt === this.elt) {
            this._pInst._setProperty("width", this.elt.offsetWidth);
            this._pInst._setProperty("height", this.elt.offsetHeight);
          }
        }
      }
      return this;
    }
  };
  b.Element.prototype.remove = function () {
    for (var g in this._events) {
      this.elt.removeEventListener(g, this._events[g]);
    }
    if (this.elt.parentNode) {
      this.elt.parentNode.removeChild(this.elt);
    }
    delete this;
  };
  b.MediaElement = function (g, h) {
    b.Element.call(this, g, h);
    this._prevTime = 0;
    this._cueIDCounter = 0;
    this._cues = [];
    this.pixelDensity = 1;
  };
  b.MediaElement.prototype = Object.create(b.Element.prototype);
  b.MediaElement.prototype.play = function () {
    if (this.elt.currentTime === this.elt.duration) {
      this.elt.currentTime = 0;
    }
    if (this.elt.readyState > 1) {
      this.elt.play();
    } else {
      this.elt.load();
      this.elt.play();
    }
    return this;
  };
  b.MediaElement.prototype.stop = function () {
    this.elt.pause();
    this.elt.currentTime = 0;
    return this;
  };
  b.MediaElement.prototype.pause = function () {
    this.elt.pause();
    return this;
  };
  b.MediaElement.prototype.loop = function () {
    this.elt.setAttribute("loop", true);
    this.play();
    return this;
  };
  b.MediaElement.prototype.noLoop = function () {
    this.elt.setAttribute("loop", false);
    return this;
  };
  b.MediaElement.prototype.autoplay = function (g) {
    this.elt.setAttribute("autoplay", g);
    return this;
  };
  b.MediaElement.prototype.volume = function (g) {
    if (typeof g === "undefined") {
      return this.elt.volume;
    } else {
      this.elt.volume = g;
    }
  };
  b.MediaElement.prototype.time = function (g) {
    if (typeof g === "undefined") {
      return this.elt.currentTime;
    } else {
      this.elt.currentTime = g;
    }
  };
  b.MediaElement.prototype.duration = function () {
    return this.elt.duration;
  };
  b.MediaElement.prototype.pixels = [];
  b.MediaElement.prototype.loadPixels = function () {
    if (this.loadedmetadata) {
      if (!this.canvas) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.drawingContext = this.canvas.getContext("2d");
      }
      this.drawingContext.drawImage(this.elt, 0, 0, this.width, this.height);
      b.Renderer2D.prototype.loadPixels.call(this);
    }
    return this;
  };
  b.MediaElement.prototype.updatePixels = function (g, k, i, j) {
    if (this.loadedmetadata) {
      b.Renderer2D.prototype.updatePixels.call(this, g, k, i, j);
    }
    return this;
  };
  b.MediaElement.prototype.get = function (g, k, i, j) {
    if (this.loadedmetadata) {
      return b.Renderer2D.prototype.get.call(this, g, k, i, j);
    } else {
      return [0, 0, 0, 255];
    }
  };
  b.MediaElement.prototype.set = function (g, i, h) {
    if (this.loadedmetadata) {
      b.Renderer2D.prototype.set.call(this, g, i, h);
    }
  };
  b.MediaElement.prototype.connect = function (i) {
    var j, g;
    if (typeof b.prototype.getAudioContext === "function") {
      j = b.prototype.getAudioContext();
      g = b.soundOut.input;
    } else {
      try {
        j = i.context;
        g = j.destination;
      } catch (h) {
        throw "connect() is meant to be used with Web Audio API or p5.sound.js";
      }
    }
    if (!this.audioSourceNode) {
      this.audioSourceNode = j.createMediaElementSource(this.elt);
      this.audioSourceNode.connect(g);
    }
    if (i) {
      if (i.input) {
        this.audioSourceNode.connect(i.input);
      } else {
        this.audioSourceNode.connect(i);
      }
    } else {
      this.audioSourceNode.connect(g);
    }
  };
  b.MediaElement.prototype.disconnect = function () {
    if (this.audioSourceNode) {
      this.audioSourceNode.disconnect();
    } else {
      throw "nothing to disconnect";
    }
  };
  b.MediaElement.prototype.showControls = function () {
    this.elt.style["text-align"] = "inherit";
    this.elt.controls = true;
  };
  b.MediaElement.prototype.hideControls = function () {
    this.elt.controls = false;
  };
  b.MediaElement.prototype.addCue = function (h, k, i) {
    var j = this._cueIDCounter++;
    var g = new c(k, h, j, i);
    this._cues.push(g);
    if (!this.elt.ontimeupdate) {
      this.elt.ontimeupdate = this._onTimeUpdate.bind(this);
    }
    return j;
  };
  b.MediaElement.prototype.removeCue = function (j) {
    for (var h = 0; h < this._cues.length; h++) {
      var g = this._cues[h];
      if (g.id === j) {
        this.cues.splice(h, 1);
      }
    }
    if (this._cues.length === 0) {
      this.elt.ontimeupdate = null;
    }
  };
  b.MediaElement.prototype.clearCues = function () {
    this._cues = [];
    this.elt.ontimeupdate = null;
  };
  b.MediaElement.prototype._onTimeUpdate = function () {
    var k = this.time();
    for (var h = 0; h < this._cues.length; h++) {
      var g = this._cues[h].time;
      var j = this._cues[h].val;
      if (this._prevTime < g && g <= k) {
        this._cues[h].callback(j);
      }
    }
    this._prevTime = k;
  };
  var c = function (j, g, i, h) {
    this.callback = j;
    this.time = g;
    this.id = i;
    this.val = h;
  };
  b.File = function (g, h) {
    this.file = g;
    this._pInst = h;
    var i = g.type.split("/");
    this.type = i[0];
    this.subtype = i[1];
    this.name = g.name;
    this.size = g.size;
    this.data = undefined;
  };
});
