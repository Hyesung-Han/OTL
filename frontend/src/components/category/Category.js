import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * CSW | 2022.03.30 | UPDATE
 * @name Category
 * @des Category 컴포넌트
 */

/**
 * TODO
 * DB에서 카테고리 불러와서 화면에 나타내기
 * 카테고리 CSS
 */
 Category.propTypes = {
    product: PropTypes.object
  };

export default function Category({product}) {

    //const {code, name} = product;

    return (
        
        <div className='Category'>
        This is Category
        </div>
    );
  }
