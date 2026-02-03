// react
import * as React from 'react'

// next
import { NextPage } from 'next'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import IconifyIcon from 'src/components/Icon'
import { VerticalItems } from 'src/configs/layout'
import { useEffect, useState } from 'react'

type TProps = {
  open: boolean
}

const RecursiveListItem = ({ items, level, open }: { items: any; level: number; open?: boolean }) => {
  const [openState, setOpen] = useState<{ [key: string]: boolean }>({})

  const handleClick = (title: string) => {
    setOpen(pre => ({
      ...pre,
      [title]: !pre[title]
    }))
  }

  useEffect(() => {
    if (!open) {
      setOpen({})
    }
  }, [open])

  return (
    <>
      {items?.map((item: any) => {
        return (
          <React.Fragment key={item.title}>
            <ListItemButton
              sx={{
                paddingLeft: `${level * 20}px`
              }}
              onClick={() => {
                if (open) {
                  handleClick(item.title)
                }
              }}
            >
              <ListItemIcon>
                <IconifyIcon icon={item.icon} />
              </ListItemIcon>
              <ListItemText primary={open ? item.title : ''} />
              {item.childrens &&
                item.childrens.length > 0 &&
                (openState[item.title] ? (
                  <IconifyIcon icon='solar:alt-arrow-down-linear' style={{ transform: 'rotate(180deg)' }} />
                ) : (
                  <IconifyIcon icon='solar:alt-arrow-down-linear' />
                ))}
            </ListItemButton>

            {item.childrens && item.childrens.length > 0 && (
              <>
                <Collapse in={openState[item.title]} timeout='auto' unmountOnExit>
                  <RecursiveListItem items={item.childrens} level={level + 1} open={open} />
                </Collapse>
              </>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

const ListVerticalLayout: NextPage<TProps> = ({ open }: TProps) => {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItem items={VerticalItems} level={1} open={open} />
    </List>
  )
}

export default ListVerticalLayout
