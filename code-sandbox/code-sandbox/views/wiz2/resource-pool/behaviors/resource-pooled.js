if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    var hasTemplateElement = ('content' in document.createElement('template'));
    var ResourcePooled = (function () {
        function ResourcePooled(element, resourcePool, viewCompiler, viewResources, viewSlot, container) {
            this.element = element;
            this.resourcePool = resourcePool;
            this.viewCompiler = viewCompiler;
            this.viewResources = viewResources;
            this.viewSlot = viewSlot;
            this.container = container;
            var template = document.createElement('template');
            if (hasTemplateElement) {
                template["content"] = document.createDocumentFragment();
            }
            while (element.firstChild) {
                template["content"].appendChild(element.firstChild);
            }
            this.template = template;
        }
        ResourcePooled.prototype.bind = function (context) {
            var _this = this;
            if (!this.pool) {
                this.pool = this.viewResources.viewUrl;
            }
            this.viewFactory = this.resourcePool.get(this.pool, 'viewFactory', function () { return _this.viewCompiler.compile(_this.template, _this.viewResources); });
            this.resourcePool.free(this.pool, 'viewFactory');
            this.view = this.resourcePool.get(this.pool, 'view', function () {
                console.log("Creating pooled view: " + _this.pool);
                return _this.viewFactory.create(_this.container, null, { suppressBind: true });
            });
            this.view.bind(context);
            this.viewSlot.add(this.view);
        };
        ResourcePooled.prototype.unbind = function () {
            this.viewSlot.remove(this.view);
            this.view.unbind();
            this.resourcePool.free(this.pool, 'view', this.view);
            this.view = null;
        };
        __decorate([
            aurelia_framework_1.bindable
        ], ResourcePooled.prototype, "pool");
        ResourcePooled = __decorate([
            aurelia_framework_1.customElement('resource-pooled'),
            aurelia_framework_1.skipContentProcessing,
            aurelia_framework_1.noView,
            aurelia_framework_1.autoinject
        ], ResourcePooled);
        return ResourcePooled;
    })();
    exports.ResourcePooled = ResourcePooled;
});
//# sourceMappingURL=resource-pooled.js.map