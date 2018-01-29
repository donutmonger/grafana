﻿import React from 'react';
import { observer } from 'mobx-react';
import { permissionOptions } from 'app/stores/PermissionsStore/PermissionsStore';

const setClassNameHelper = inherited => {
  return inherited ? 'gf-form-disabled' : '';
};

export default observer(({ item, removeItem, permissionChanged, itemIndex, folderTitle }) => {
  const handleRemoveItem = evt => {
    evt.preventDefault();
    removeItem(itemIndex);
  };

  const handleChangePermission = evt => {
    evt.preventDefault();
    const value = evt.target.value;
    const valueAsInt = parseInt(value, 10);
    const newPermission = permissionOptions.find(opt => opt.value === valueAsInt);
    permissionChanged(itemIndex, newPermission.value, newPermission.text);
  };

  return (
    <tr className={setClassNameHelper(item.inherited)}>
      <td style={{ width: '100%' }}>
        <i className={item.icon} />
        <span dangerouslySetInnerHTML={{ __html: item.nameHtml }} />
      </td>
      <td>{item.inherited ? <em className="muted no-wrap">Inherited from folder {folderTitle} </em> : null}</td>
      <td className="query-keyword">Can</td>
      <td>
        <div className="gf-form-select-wrapper">
          <select
            value={item.permission}
            className="gf-form-input gf-size-auto"
            onChange={handleChangePermission}
            disabled={item.inherited}
          >
            {permissionOptions.map((option, idx) => {
              return (
                <option key={idx} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
        </div>
      </td>
      <td>
        {!item.inherited ? (
          <a className="btn btn-danger btn-small" onClick={handleRemoveItem}>
            <i className="fa fa-remove" />
          </a>
        ) : null}
      </td>
    </tr>
  );
});