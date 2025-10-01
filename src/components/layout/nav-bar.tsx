'use client';

import { FullScreenIcon } from '@/icons/full-screen';
import { SplitScreenIcon } from '@/icons/split-screen';
import { useAppStore, useSplitScreen } from '@/store';

import React from 'react';

import Image from 'next/image';

import { ActionButton } from '../shared/action-button';
import CustomDropDown from '../shared/custom-drop-down';
import Logo from '../shared/logo';
import { SearchInput } from '../shared/search-input';

function NavBar() {
  const { toggleSplitScreen } = useAppStore();
  const isSplitScreen = useSplitScreen();

  return (
    <nav className="w-full bg-white rounded-xs">
      <section className="mx-auto flex justify-between items-center py-2 px-4 max-w-[1920px]">
        <div className="flex items-center gap-5">
          <Logo />

          <div className="hidden xl:flex items-center border border-primary">
            <SplitScreenBtn isSplitScreen={isSplitScreen} onClick={toggleSplitScreen} type="full" />
            <SplitScreenBtn
              isSplitScreen={isSplitScreen}
              onClick={toggleSplitScreen}
              type="split"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SearchInput />
          <ActionButton type={'notification'} />
          <CustomDropDown type="settings">
            <div className="size-12 relative">
              <Image
                src="/users/1.jpg"
                alt="Profile"
                width={48}
                height={48}
                className="size-12 rounded-xs border border-Bg-Dark bg-light-bg object-cover"
              />
            </div>
          </CustomDropDown>
        </div>
      </section>
    </nav>
  );
}

export default NavBar;

interface SplitScreenBtnProps {
  onClick: () => void;
  isSplitScreen: boolean;
  type?: 'full' | 'split';
}

function SplitScreenBtn({ isSplitScreen, onClick, type }: SplitScreenBtnProps) {
  const isActive = type === 'split' ? isSplitScreen : !isSplitScreen;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`size-10 2xl:size-12 grid place-items-center ${
        isActive ? 'bg-primary text-white' : 'bg-white text-primary'
      }`}
    >
      {type === 'full' ? (
        <FullScreenIcon
          className={`size-6`}
          fill={isActive ? 'white' : '#5F0101'}
          stroke={isActive ? '' : '#5F0101'}
        />
      ) : (
        <SplitScreenIcon
          className={`size-6`}
          fill={isActive ? 'white' : '#5F0101'}
          stroke={isActive ? 'white' : ''}
        />
      )}
    </button>
  );
}
