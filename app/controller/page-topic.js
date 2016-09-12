'use strict';

const rpc = require('@ninozhang/rpc');
const extend = require('extend');
const util = require('../lib/util');

function* getProduct(productId) {
	let product = yield rpc.mall.product.get({
		data: {
			productId: productId
		},
		dataIn: 'response.body.data.product'
	});

	return product;
};

exports.get = function*() {
	const topicId = this.params.topicId;

	let topic = yield rpc.mall.topic.get({
		data: {
			topicId: topicId
		},
		dataIn: 'response.body.data.topic'
	});

	let components = topic.components || [];
	components = components.sort( (left, right) => {
		if (left.weight < right.weight) {
			return 1;
		} else if (left.weight > right.weight) {
			return -1;
		} else {
			return 0;
		}
	} );

	for (let i = 0, len = components.length; i < len; i++) {
		let component = components[i];

		let componentInfo = yield rpc.mall.topicComponent.get({
			data: {
				topicComponentId: component.id
			},
			dataIn: 'response.body.data.topicComponent'
		});

		if (!componentInfo) {
			components[i] = null;
			continue;
		}
		extend(component, componentInfo);

		switch(component.type) {
			case 'bannerList':
			case 'itemList':
			case 'itemSlide':
				component.products = component.productId || [];
				delete component.productId;
				// 获取商品列表详情
				for (let i = 0, len = component.products.length; i < len; i++) {
					let product = component.products[i];

					let productInfo = yield getProduct(product.id);
					if (!productInfo) {
						component.products[i] = null;
						continue ;
					}
					extend(product, util.extract(productInfo, ['id', 'title', 'name', 'originPrice', 'price', 'photos']));

					if (product.photos && product.photos[0]) {
						product.photo = product.photos[0];
					} else {
						product.photo = {};
					}
					delete product.photos;

					// 获取商品贷款信息
					let loan = yield rpc.fin.xiaoying.loan.calculate({
						data: {
							principal: product.price
						},
						dataIn: 'response.body.data.loan'
					});
					product.loan = {
						firstPay: loan.roundDownMonthlyRepay
					};
				}

				// 清除已删除的商品
				component.products = component.products.filter( (product) => product !== null);
				break;
			default:
		}
	}

	topic.components  = topic.components.filter( (component) => component !== null);
	this.body = {
		topic: topic
	};
};
