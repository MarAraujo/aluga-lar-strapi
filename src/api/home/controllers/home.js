'use strict';

/**
 * home controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::home.home', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    let { data } = ctx.request.body
    const files =ctx.request.files
    data = JSON.parse(data)
    data.user_id = user.id

    const newReview = await strapi.service('api::home.home').create({
      data: {
        ...data
      },
      files: {
        images: files['files.images']
      }
    });

    const sanitizedEntity = await this.sanitizeOutput(newReview, ctx);
    return this.transformResponse(sanitizedEntity);
  }
}));