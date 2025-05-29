import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import BlocksForm from '@plone/volto/components/manage/Blocks/Block/BlocksForm';
import { getFooterInherit } from '../../../../../actions';
import EditBlockWrapper from '@plone/volto/components/manage/Blocks/Block/EditBlockWrapper';
import './footer.less';
const Footer = ({ onChangeField }) => {
  const dispatch = useDispatch();
  const pathname = useSelector((state) => state.router.location?.pathname);
  const content = useSelector((state) => state.content.data);
  const footerInherit = useSelector((state) => state.footerInherit);
  const [isClient, setIsClient] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [footerState, setFooterState] = useState(null);
  // Determine mode from URL
  const mode = pathname?.endsWith('/edit') ? 'edit' : 'view';
  const footerDefault = {
    blocks: {
      '249cb267-394b-4e18-991d-8d5038fc60b7': {
        '@type': 'slate',
        plaintext: 'Volto editable footer',
        value: [
          {
            children: [
              {
                text: 'Volto editable footer',
              },
            ],
            type: 'p',
          },
        ],
      },
    },
    blocks_layout: {
      items: ['249cb267-394b-4e18-991d-8d5038fc60b7'],
    },
  };
  useEffect(() => {
    setIsClient(true);
  }, []);

  const defaultFooterBlocks = {
    blocks: {
      'footer-text': {
        '@type': 'text',
        text: {
          blocks: [
            {
              key: 'default',
              text: 'Footer content - Edit me!',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['footer-text'],
    },
  };

  useEffect(() => {
    if (pathname && mode !== 'edit') {
      dispatch(getFooterInherit(pathname));
    }
  }, [dispatch, pathname, mode]);

  const handleUpdateFooter = (newData) => {
    const updatedFooter = {
      ...(footerState || {}),
      ...newData,
    };
    setFooterState(updatedFooter);

    // Update parent form through onChangeField
    if (onChangeField) {
      onChangeField('footer', updatedFooter);
    }
  };
  const getFooterData = () => {
    // In edit mode, use current content footer
    if (mode === 'edit' && content?.footer) {
      return content.footer;
    }

    // In view mode, use inherited footer
    if (footerInherit?.data?.footer) {
      return footerInherit.data.footer;
    }

    // Fallback to default blocks
    return defaultFooterBlocks;
  };

  const footerData = getFooterData();

  // Only show edit mode if content has footer property and we're in edit mode
  if (mode === 'edit' && content && 'footer' in content && isClient) {
    return (
      <footer className="ui grey inverted vertical padded center aligned segment">
        <div style={{ width: '80%', margin: 'auto' }}>
          <BlocksForm
            properties={footerState || footerDefault}
            manage={false}
            selectedBlock={selectedBlock}
            title={''}
            onSelectBlock={(s) => {
              setSelectedBlock(s);
            }}
            onChangeFormData={(newFormData) => {
              handleUpdateFooter({
                ...footerState,
                ...newFormData,
              });
            }}
            onChangeField={(id, value) => {
              if (['blocks', 'blocks_layout'].indexOf(id) > -1) {
                const blockState = {};
                blockState[id] = value;
                handleUpdateFooter({
                  ...footerState,
                  ...blockState,
                });
              } else {
                handleUpdateFooter({
                  ...footerState,
                  ...{
                    blocks: {
                      [id]: value,
                    },
                  },
                });
              }
            }}
            pathname={pathname}
          >
            {({ draginfo }, editBlock, blockProps) => (
              <EditBlockWrapper
                draginfo={draginfo}
                blockProps={blockProps}
                disabled={false}
              >
                {editBlock}
              </EditBlockWrapper>
            )}
          </BlocksForm>
        </div>
      </footer>
    );
  }

  // Only show footer if we have data to display
  if (!footerData?.blocks || Object.keys(footerData.blocks).length === 0) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer-view">
        <RenderBlocks content={footerData} />
      </div>
    </footer>
  );
};

export default Footer;
